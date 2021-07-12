import Cookies from "js-cookie";


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
        AccessToken.value = null;
        return localStorage.removeItem(ACCESS_TOKEN)
    },
}


export const initAccessToken = () => {
    const access_token = Cookies.get(ACCESS_TOKEN);
    if(access_token) {
        localStorage.setItem(ACCESS_TOKEN, access_token);
        Cookies.remove(ACCESS_TOKEN)
        AccessToken.value = access_token
    } else {
        AccessToken.value = AccessToken.getAccessToken();
    }
}


export default AccessToken