import * as axios from "axios";

const instance = axios.create({
    baseURL: window.location.origin === "http://localhost:3000" ? "http://127.0.0.1:8000/api/" : window.location.origin + "/api/",
});

export default instance