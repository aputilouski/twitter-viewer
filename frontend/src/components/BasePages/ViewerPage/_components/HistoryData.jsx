import React from 'react';
import {connect} from "react-redux";
import {Grid, Paper, Box, Typography, IconButton} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {createStyles, withStyles} from "@material-ui/styles";
import {compose} from "redux";
import actions from "../../../../redux/viewerReducer/viewerActions";


const styles = (theme) => {
    return createStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        padding: 0,
        margin: 0,
        width: 36,
        borderRadius: 4,
        "&:hover":{
            backgroundColor: theme.palette.action.selected,
        }
    },
    paper: {
        width: '100%',
        padding: 8,
        margin: 0,
        "&:hover":{
            backgroundColor: theme.palette.action.selected,
            cursor: "pointer"
        },
        borderRadius: 4
    },
})};


class HistoryData extends React.Component {
    clickOnRemoveIcon = (item) => {
        this.props.removeFromHistory(item);
    }
    clickOnPaper = (item) => {
        this.props.setValue(item);
    }
    render() {
        const classes = this.props.classes;
        if (!this.props.history.length) {
            return
        }
        return (
            <Box mb={10}>
                <Grid container spacing={2}>
                    {this.props.history.map((item) => (
                        <Grid item xs={2} key={item}>
                            <Paper className={classes.root}>
                                <Box className={classes.paper} onClick={this.clickOnPaper.bind(this, item)}>
                                    <Typography variant='body2'>{item}</Typography>
                                </Box>
                                <IconButton aria-label="delete" className={classes.button} onClick={this.clickOnRemoveIcon.bind(this, item)}>
                                    <HighlightOffIcon/>
                                </IconButton>
                            </Paper>
                        </Grid>
                    ))
                    }
                </Grid>
            </Box>

        );
    }
}


let mapStateToProps = (state) => {
    return {
        history: state.twitterPage.history,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        removeFromHistory: (historyItem) => {
            dispatch(actions.__create_action.removeHistoryItem(historyItem));
        },
        setValue: (input) => {
            dispatch(actions.__create_action.setInputValue(input));
        }

    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(HistoryData);
