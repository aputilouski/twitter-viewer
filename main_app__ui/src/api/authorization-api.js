import instance, {DEFAULT_SERVER_ERROR_MESSAGE, INTERNET_CONNECTION_ERROR_MESSAGE, NO_TOKEN_ERROR_MESSAGE} from "./api";
import {logoutThunk} from "../redux/user-reduser";
import {setAlertZoneActionCreator, setErrorMessage} from "../redux/app-reduser";

const ACCESS_TOKEN = 'access_token';


export const setAccessToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
}
export const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN)
}
export const removeAccessToken = () => {
    return localStorage.removeItem(ACCESS_TOKEN)
}

export let AUTHORIZATION_HEADER = () => {
    return {'Authorization': `Token ${getAccessToken()}`}
}

export function addAutoLogoutHandler(request, dispatch, callback = undefined) {
    if (!dispatch) return;
    const showAlert = (message) => (dispatch) => {
        dispatch(setAlertZoneActionCreator(setErrorMessage(message)));
    }
    request.catch(error => {
        if (error.response?.status === 403) {
            const message = error.response?.data?.detail;
            switch (message) {
                case "access_token expired":
                    refreshToken(dispatch).then(() => {
                        if (callback)
                            callback(dispatch);
                    }).catch(() => {
                        showAlert(DEFAULT_SERVER_ERROR_MESSAGE);
                    });
                    break;
                case "token prefix missing":
                    showAlert(NO_TOKEN_ERROR_MESSAGE);
                    break;
                default:
                    showAlert(DEFAULT_SERVER_ERROR_MESSAGE);
            }
        } else if (error.response?.status === 500) {
            showAlert(DEFAULT_SERVER_ERROR_MESSAGE);
            dispatch(logoutThunk());
        } else if (!error.response) {
            showAlert(INTERNET_CONNECTION_ERROR_MESSAGE);
        }
    });
}


export function refreshToken(dispatch) {
    return AuthorizeAPI.refreshToken().then((response) => {
        if (response.data?.access_token)
            setAccessToken(response.data.access_token)
    }).catch(error => {
        if (error.response.status === 403)
            dispatch(logoutThunk());
    });
}

export const AuthorizeAPI = {
    getTwitterAuthorizePage() {
        return instance.get(`auth/request_token/`)
    },
    refreshToken() {
        return instance.post(`auth/refresh_token/`, null, {
            withCredentials: true,
        })
    }
}
