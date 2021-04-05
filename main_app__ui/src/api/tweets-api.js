import instance from "./api";
import {AUTHORIZATION_HEADER} from "./authorization-api";

export const tweetsAPI = {
    getTweets(currentPage = 1, input) {
        return instance.post(`get_tweets/?page=${currentPage}`, {input: input}, {
            headers: {...AUTHORIZATION_HEADER()}
        })
    },
}
