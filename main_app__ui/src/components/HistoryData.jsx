import React from 'react';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {createStyles, withStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import {compose} from "redux";
import {removeHistoryItem, setInputValue} from "../redux/twitter-reduser";
import Tooltip from "@material-ui/core/Tooltip";


const styles = (theme) => {
    return createStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        padding: 8,
        "&:hover":{
            backgroundColor: theme.palette.warning.light,
        }
    },
    paper: {
        width: '100%',
        padding: 10,
        "&:hover":{
            backgroundColor: theme.palette.warning.light,
        },
        borderRadius: 4
    }
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
                                <Tooltip title="Delete">
                                    <IconButton aria-label="delete" className={classes.button} onClick={this.clickOnRemoveIcon.bind(this, item)}>
                                        <HighlightOffIcon/>
                                    </IconButton>
                                </Tooltip>
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
            dispatch(removeHistoryItem(historyItem));
        },
        setValue: (input) => {
            dispatch(setInputValue(input));
        }

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(HistoryData);
