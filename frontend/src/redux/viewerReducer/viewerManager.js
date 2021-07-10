import viewerAPI from "../../api/viewerApi";
import actions from "./viewerActions";
import appActions from "../appReducer/appActions";


// Thunks
const ViewerManager = {
    loadTweets: (currentPage, input) => (dispatch) => {
        return viewerAPI.getTweets(currentPage, input).then(response => {
            dispatch(actions.__create_action.setTweets(response.data));
            dispatch(actions.__create_action.addHistoryItem(input));
        }).catch((error) => {
            dispatch(actions.__create_action.clearTweets());
            dispatch(appActions.__create_action.setAlertZoneErrorMessage(error?.response?.data?.message));
        })
    },
}


export default ViewerManager;