import React from 'react';
import TweetsContainer from "./Tweet/TweetsContainer";
import ActionArea from "./ActionArea/ActionArea";
import HistoryData from "./HistoryData";
import MediaArea from "./MediaArea";
import {connect} from "react-redux";
import {getTweetsTHUNK, setMediaAriaData} from "../redux/twitter-reduser";

const Content = (props) => {
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
        dispatch(setMediaAriaData(media));
    },
    getTweets: async (page, input) => {
        await getTweetsTHUNK(page, input)(dispatch);
        document.querySelector('body').scrollIntoView({behavior: "smooth"});
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Content);
