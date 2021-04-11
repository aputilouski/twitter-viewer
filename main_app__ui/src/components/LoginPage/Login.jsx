import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getTwitterAuthorizePage, initUserProfile} from "../../redux/user-reduser";
import {createStyles, withStyles} from "@material-ui/styles";
import {compose} from "redux";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";


const styles = (theme) => {
    return createStyles({
        root: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center"
        },
        box: {
            textAlign: "center",
            margin: "0 auto",
            marginTop: "-80px",
        },
        h1: {
            fontSize: "36px",
            fontWeight: 600,
            margin: "40px 0",
        }
    })
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isDisabledButton: false};
    }
    componentDidMount() {
        this.props.initUserProfile()
    }

    render() {
        if (this.props.user.isLogin) {
            return <Redirect to={"/main"}/>
        }

        const classes = this.props.classes;
        const loginWithTwitter = async () => {
            this.setState({isDisabledButton: true});
            await getTwitterAuthorizePage();
            this.setState({isDisabledButton: false});
        }

        return (
            <Container maxWidth="sm" className={classes.root}>
                <Box className={classes.box}>
                    <Typography variant="h1" className={classes.h1}>TWITTER VIEWER</Typography>
                    <Button onClick={loginWithTwitter} variant="contained" color="primary" disabled={this.state.isDisabledButton}>
                        Login with Twitter
                    </Button>
                </Box>
            </Container>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
let mapDispatchToProps = {
    initUserProfile
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Login);
