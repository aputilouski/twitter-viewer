import instance from "./api";

export const tweetsAPI = {
    getTweets(currentPage = 1, input) {
        return instance.post(`get_tweets/${currentPage}`, {input: input})
            .then(response => {
                return response.data;
            });
    },
}
