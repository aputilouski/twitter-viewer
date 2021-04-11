import instance from "./api";
import {addAutoLogoutHandler, AUTHORIZATION_HEADER, refreshToken} from "./authorization-api";


export const userAPI = {
    getUserProfile(dispatch, callback) {
        const request = instance.post('profile/', null, {
            headers: {...AUTHORIZATION_HEADER()}
        });
        addAutoLogoutHandler(request, dispatch, callback);
        return request;
    }
}
