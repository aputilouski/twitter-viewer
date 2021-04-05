import instance from "./api";
import {AUTHORIZATION_HEADER} from "./authorization-api";

export const userAPI = {
    getUserProfile() {
        return instance.post('profile/', null, {
            headers: {...AUTHORIZATION_HEADER()}
        })
    }
}
