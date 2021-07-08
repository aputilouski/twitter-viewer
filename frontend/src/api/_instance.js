import * as axios from "axios";
import settings from "../settings";
import AccessToken from "../utils/AccessToken";


export const authorization_header = () => {
    const accessToken = AccessToken.value;
    return accessToken ? {'Authorization': `Token ${accessToken}`} : {};
}


export const defaultInstance = axios.create({
    baseURL: settings.API_URL,
})


export default function create_instance() {
    return axios.create({
        baseURL: settings.API_URL,
        headers: {...authorization_header()}
    })
}
