import viewerAPI from "../../api/viewerApi";
import actions from "./viewerActions";
import appActions from "../appReducer/appActions";


// Thunks
const ViewerManager = {
    loadTweets: (currentPage, input) => (dispatch) => {
        return viewerAPI.getTweets(currentPage, input).then(response => {
            if (!response.data.amount) {
                throw new Error("No tweets found for the current user!");
            }
            dispatch(actions.__create_action.setTweets(response.data));
            dispatch(actions.__create_action.addHistoryItem(input));
        }).catch((error) => {
            dispatch(actions.__create_action.clearTweets());
            if(error.response)
                dispatch(appActions.__create_action.setAlertZoneErrorMessage(error?.response?.data?.message));
            else
                dispatch(appActions.__create_action.setAlertZoneErrorMessage(error?.message));
        })
    },
}


export default ViewerManager;