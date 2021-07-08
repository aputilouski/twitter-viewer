const ACCESS_TOKEN = 'access_token';


const AccessToken = {
    value: null,
    getAccessToken: () => {
        return localStorage.getItem(ACCESS_TOKEN)
    },
    setAccessToken: (token) => {
        this.value = token;
        localStorage.setItem(ACCESS_TOKEN, token);
    },
    removeAccessToken: () => {
        return localStorage.removeItem(ACCESS_TOKEN)
    },
}


export default AccessToken