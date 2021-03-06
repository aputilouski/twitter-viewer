import React from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {createStyles, withStyles} from "@material-ui/styles";
import {compose} from "redux";
import actions from "../../../../redux/viewerReducer/viewerActions";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";


const maxLength16 = maxLengthCreator(16);


const styles = (theme) => {
    return createStyles({
        form: {
            display: 'flex',
            justifyContent: 'center',
            margin: '40px 0'
        },
        formElements: {
            [theme.breakpoints.down('xs')]: {
                width: '60%',
            },
        },
        formButton: {
            margin: '10px 10px 10px 30px',
            [theme.breakpoints.down('xs')]: {
                width: '40%',
                margin: '14px 0 0 24px',
            },
        },
    })
};


const GetUserTweetsForm = withStyles(styles)(class extends React.Component {

    renderTextField = ({label, input, meta: {touched, invalid, error}, ...custom}) => (
        <TextField
            label={label}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    )
    onChangeInput = (event, value) => {
        this.props.changeInputValue(value);
    }
    render() {
        const classes = this.props.classes;
        return (
            <>
                <form onSubmit={this.props.handleSubmit} className={classes.form}>
                    <Field
                        name="username"
                        component={this.renderTextField}
                        label="Username"
                        onChange={this.onChangeInput}
                        validate={[required, maxLength16]}
                        className={classes.formElements}
                    />
                    <div className={classes.formButton}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit" disabled={this.props.submitting}>View timeline</Button>
                    </div>
                </form>
            </>
        );
    }
});


const GetUserTweetsReduxForm = connect(
    state => ({
        initialValues: state.twitterPage.inputValue
    }),
    dispatch => ({
        changeInputValue: (value) => {
            dispatch(actions.__create_action.setInputValue(value));
        }
    })
    )(reduxForm({form: 'get_tweets', enableReinitialize: true})(GetUserTweetsForm));


class ActionArea extends React.Component {
    onSubmit = async (formData) => {
        this.props.loadingStatus(true);
        this.props.currentPage(1);
        await this.props.getTweets(1, formData.username);
    }
    render() {
        return (
            <div>
                <GetUserTweetsReduxForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}


let mapStateToProps = (state) => {
    return {
        initialValues: state.twitterPage.inputValue
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        loadingStatus: (status) => {
            dispatch(actions.__create_action.setLoadingStatus(status));
        },
        currentPage: (value) => {
            dispatch(actions.__create_action.setCurrentPage(value));
        }
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ActionArea);

