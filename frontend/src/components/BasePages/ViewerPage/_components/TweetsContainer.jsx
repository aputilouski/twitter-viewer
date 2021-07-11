import React from 'react';
import {connect} from "react-redux";
import {Grid} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {makeStyles} from "@material-ui/styles";
import Tweet from "./Tweet";
import actions from "../../../../redux/viewerReducer/viewerActions";


const styles = makeStyles((theme) => ({
    pagination_wrapper: {
        display: 'flex',
    },
    pagination: {
        margin: '40px auto'
    }
}));


const TweetsContainer = (props) => {
    const classes = styles();
    const tweets = props.tweets.map(
        tweet => <Grid key={tweet.id} item xs={12} md={6} lg={4}>
            <Tweet isLoading={props.isLoading}
                   setMediaAreaData={props.setMediaAreaData}
                   {...tweet} />
        </Grid>);

    const handleChange = async (event, value) => {
        props.setCurrentPage(value);
        await props.getTweets(value, props.inputValue.username);
    };

    const pages_amount = props.pageSize > 0 ? Math.ceil(props.tweetsAmount/props.pageSize) : 0;

    return (
        <>
            {tweets.length > 0 &&
                <Grid container spacing={3}>{tweets}</Grid>
            }
            {(tweets.length > 0 || props.currentPage > 1) &&
                <div className={classes.pagination_wrapper}>
                    <Pagination count={pages_amount} page={props.currentPage} onChange={handleChange}
                                variant="outlined" className={classes.pagination} color="primary"/>
                </div>
            }

        </>
    );
}


let mapStateToProps = (state) => {
    return {
        tweets: state.twitterPage.tweets,
        tweetsAmount: state.twitterPage.tweetsAmount,
        pageSize: state.twitterPage.pageSize,
        currentPage: state.twitterPage.currentPage,
        inputValue: state.twitterPage.inputValue,
        isLoading: state.twitterPage.isLoading,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPage: (value) => {
            dispatch(actions.__create_action.setCurrentPage(value));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TweetsContainer);
