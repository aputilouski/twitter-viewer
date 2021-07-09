import React from 'react';
import TweetsContainer from "./_components/TweetsContainer";
import ActionArea from "./_components/ActionArea";
import HistoryData from "./_components/HistoryData";
import MediaArea from "./_components/MediaArea";
import {connect} from "react-redux";
import ViewerManager from "../../../redux/viewerReducer/viewerManager";
import actions from "../../../redux/viewerReducer/viewerActions";


const ViewerPage = (props) => {
    return (
        <div>
            <ActionArea getTweets={props.getTweets}/>
            <HistoryData />
            <TweetsContainer setMediaAreaData={props.setMediaAreaData} getTweets={props.getTweets} />
            <MediaArea setMediaAreaData={props.setMediaAreaData} />
        </div>
    );
}


const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    setMediaAreaData: (media) => {
        dispatch(actions.__create_action.setMediaAriaData(media));
    },
    getTweets: async (page, input) => {
        await dispatch(ViewerManager.loadTweets(page, input));
        document.querySelector('body').scrollIntoView({behavior: "smooth"});
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(ViewerPage);
