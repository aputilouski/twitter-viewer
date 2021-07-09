import {defaultInstance} from "./_instance";
import addResponseHandler from "../utils/ResponseHandler";


const AuthorizationAPI = {
    getTwitterAuthorizePage() {
        return addResponseHandler(()=>{return defaultInstance.get(`auth/request_token/`)})

    },
    refreshToken() {
        return defaultInstance.post(`auth/refresh_token/`, null, {
            withCredentials: true,
        })
    }
}


export default AuthorizationAPI;