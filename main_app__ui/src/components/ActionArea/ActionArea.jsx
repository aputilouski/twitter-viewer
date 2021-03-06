import React from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Field, reduxForm} from "redux-form";
import styles from './ActionArea.module.css'
import {connect} from "react-redux";
import {setCurrentPage, setLoadingStatus} from "../../redux/twitter-reduser";


class GetUserTweetsForm extends React.Component {

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
    render() {
        return (
            <>
                <form onSubmit={this.props.handleSubmit} className={styles.form}>
                    <Field
                        name="username"
                        component={this.renderTextField}
                        label="Username"
                    />
                    <div className={styles.formButton}>
                        <Button variant="contained" color="primary" type="submit" disabled={this.props.submitting}>View</Button>
                    </div>
                </form>
            </>
        );
    }
}

const GetUserTweetsReduxForm = connect(
    state => ({
        initialValues: state.twitterPage.inputValue
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
            dispatch(setLoadingStatus(status));
        },
        currentPage: (value) => {
            dispatch(setCurrentPage(value));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActionArea);

