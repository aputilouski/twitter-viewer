import instance from "./api";
import {addAutoLogoutHandler, AUTHORIZATION_HEADER} from "./authorization-api";

export const tweetsAPI = {
    getTweets(dispatch, currentPage = 1, input) {
        const request =  instance.post(`get_tweets/?page=${currentPage}`, {input: input}, {
            headers: {...AUTHORIZATION_HEADER()}
        });
        addAutoLogoutHandler(request, dispatch);
        return request;
    },
}
