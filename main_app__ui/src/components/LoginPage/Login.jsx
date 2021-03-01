import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import styles from "./LoginPage.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Field, isSubmitting, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {loginUserThunk} from "../../redux/user-reduser";
import {Redirect} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const maxLength16 = maxLengthCreator(16);
const minLength4 = minLengthCreator(4);

const renderTextField = ({label, input, meta: {touched, invalid, error}, ...custom}) => {
    return <TextField
        label={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
}

const LoginForm = (props) => {

    let {handleSubmit, error} = props;

    return (
        <div className={styles.formContainer}>
            <div className={styles.headerContainer}>
                <h1 className={styles.header}>
                    TWITTER VIEWER
                </h1>
                {error &&
                <div className={styles.formError}>
                    {error}
                </div>}
            </div>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <div className={styles.formField}>
                    <Field
                        name="login"
                        component={renderTextField}
                        label="Login"
                        validate={[required, minLength4, maxLength16]}
                    />
                </div>
                <div className={styles.formField}>
                    <Field
                        name="password"
                        component={renderTextField}
                        label="Password"
                        type='password'
                        validate={[required, minLength4, maxLength16]}
                    />
                </div>
                <div className={`${styles.formField} ${styles.formButton}`}>
                    <Button variant="contained" color="primary" type="submit">
                        <span>Login</span>
                        {props.submitting &&
                            <span style={{display:'flex',marginLeft: 10}}>
                                <CircularProgress  color="inherit" disableShrink size={20} thickness={5}/>
                            </span>
                        }
                    </Button>
                </div>
            </form>
        </div>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const LoginPage = (props) => {

    if (props.user.isLogin) {
        return <Redirect to={"/main"}/>
    }

    const formSubmit = async (formData) => {
        let user = {};
        user.login = formData.login;
        user.password = formData.password;
        await props.loginUserThunk(user);
    }
    return(
        <Container maxWidth="sm">
            <LoginReduxForm onSubmit={formSubmit} />
        </Container>
    )
}


let mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
let mapDispatchToProps = {
    loginUserThunk
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)

