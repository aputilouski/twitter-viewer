const ACCESS_TOKEN = 'access_token';


let AccessToken = {
    value: null,
    getAccessToken: () => {
        return localStorage.getItem(ACCESS_TOKEN)
    },
    setAccessToken: (token) => {
        AccessToken.value = token;
        localStorage.setItem(ACCESS_TOKEN, token);
    },
    removeAccessToken: () => {
        return localStorage.removeItem(ACCESS_TOKEN)
    },
}
export const initAccessToken = () => {
    AccessToken.value = AccessToken.getAccessToken();
}


export default AccessToken