import store from "../redux/_store";
import actions, {DefaultMessages} from "../redux/appReducer/appActions";
import refreshToken from "./RefreshToken";


const showAlert = (message) => {
    store.dispatch(actions.__create_action.setAlertZoneErrorMessage(message));
}


function addResponseHandler(callback) {
    if(typeof callback !== 'function' ) {
        throw new Error(`Wrong argument passed - "${typeof(callback)}", needed Function`)
    }

    return new Promise((resolve, reject) => {

        callback()
            .then((response) => { resolve(response); })
            .catch(async error => {
                if (error.response?.status === 403) {
                    const message = error.response?.data?.detail;
                    switch (message) {
                        case "access_token expired":
                            refreshToken().then(() => {
                                callback().then(
                                    r => {resolve(r)},
                                    e => {reject(e)},
                                );
                            }).catch((error) => {
                                showAlert();
                                reject(error);
                            })
                            break;
                        case "token prefix missing":
                            showAlert(DefaultMessages.NO_TOKEN_ERROR_MESSAGE);
                            reject(error);
                            break;
                        default:
                            showAlert();
                            reject(error);
                    }
                } else if (error.response?.status === 500) {
                    showAlert(error.response?.data?.message);
                    reject(error);
                } else if (!error.response) {
                    showAlert(DefaultMessages.INTERNET_CONNECTION_ERROR_MESSAGE);
                    reject(error);
                } else {
                    reject(error);
                }

            });
    });
}

export default addResponseHandler;