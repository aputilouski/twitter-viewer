import AuthorizationAPI from "../api/authorizationApi";
import AccessToken from "./AccessToken";
import store from "../redux/_store";
import ProfileManager from "../redux/profileManager";


const refreshToken = function () {
    return AuthorizationAPI.refreshToken().then(
        (response) => {
            if (response.data?.access_token)
                AccessToken.setAccessToken(response.data.access_token)
            return response
        },
        (error) => {
            if (error.response.status === 403)
                store.dispatch(ProfileManager.logout());
            throw Error(error);
        });
}


export default refreshToken