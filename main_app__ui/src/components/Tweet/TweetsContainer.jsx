import React from 'react';
import {connect} from "react-redux";
import Tweet from "./Tweet";
import Grid from "@material-ui/core/Grid";

const TweetsContainer = (props) => {
    const tweets = props.tweets.map(
        tweet => <Grid key={tweet.id} item xs={4}>
            <Tweet isLoading={props.isLoading}
                   setMediaAreaData={props.setMediaAreaData}
                   {...tweet} />
        </Grid>);

    return (
        <>
            {tweets.length > 0 &&
                <Grid container spacing={3}>{tweets}</Grid>
            }
        </>
    );
}

let mapStateToProps = (state) => {
    return {
        tweets: state.twitterPage.tweets,
        isLoading: state.twitterPage.isLoading,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(TweetsContainer);
