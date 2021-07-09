import viewerAPI from "../../api/viewerApi";
import actions from "./viewerActions";


// Thunks
const ViewerManager = {
    loadTweets: (currentPage, input) => (dispatch) => {
        return viewerAPI.getTweets(currentPage, input).then(response => {
            dispatch(actions.__create_action.setTweets(response.data));
            dispatch(actions.__create_action.addHistoryItem(input));
        }).catch(() => {
            dispatch(actions.__create_action.clearTweets());
        })
    },
}


export default ViewerManager;