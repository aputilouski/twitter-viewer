import React from 'react';
import TweetsContainer from "./Tweet/TweetsContainer";
import ActionArea from "./ActionArea/ActionArea";
import HistoryData from "./HistoryData";
import MediaArea from "./MediaArea";
import {connect} from "react-redux";
import {setMediaAriaData} from "../redux/twitter-reduser";

const Content = (props) => {
    return (
        <div>
            <ActionArea />
            <HistoryData />
            <TweetsContainer setMediaAreaData={props.setMediaAreaData} />
            <MediaArea setMediaAreaData={props.setMediaAreaData} />
        </div>
    );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    setMediaAreaData: (media) => {
        dispatch(setMediaAriaData(media));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Content);
