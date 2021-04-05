import instance from "./api";

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
