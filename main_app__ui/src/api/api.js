import * as axios from "axios";
import settings from "../settings";

const instance = axios.create({
    baseURL: settings.API_URL,
});

export const DEFAULT_SERVER_ERROR_MESSAGE = "Oops. Something went wrong. Please try again later.";
export const INTERNET_CONNECTION_ERROR_MESSAGE = "Please, check you Internet connection.";
export const NO_TOKEN_ERROR_MESSAGE = "Credentials Error! Please, try to re-login.";

export default instance