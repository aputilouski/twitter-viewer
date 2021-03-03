import * as axios from "axios";

const instance = axios.create({
    baseURL: window.location.origin,
});

export default instance