import instance, {defaultInstance} from "./_instance";


const AuthorizationAPI = {
    getTwitterAuthorizePage() {
        return instance().get(`auth/request_token/`)
    },
    refreshToken() {
        return defaultInstance.post(`auth/refresh_token/`, null, {
            withCredentials: true,
        })
    }
}


export default AuthorizationAPI;