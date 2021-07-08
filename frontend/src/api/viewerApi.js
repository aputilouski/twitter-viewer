import instance from "./_instance";
import addResponseHandler from "../utils/ResponseHandler";


const viewerAPI = {
    getTweets(currentPage = 1, input) {
        const requestThunk = () => {
           return instance().get('/load_tweets', {
               params: {
                   page: currentPage,
                   input: input,
               }
           });
        }

        return addResponseHandler(requestThunk)
    },
}


export default viewerAPI;