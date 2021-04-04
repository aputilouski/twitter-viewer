import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {logoutThunk} from "../../redux/user-reduser";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    profile_data: {
        margin: "0 40px 0 10px",
    }

}));

const Header = (props) => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6" className={classes.root}>
                        Twitter Viewer
                    </Typography>
                    <Toolbar>
                        <Avatar src={props.profile.image} />
                        <Box className={classes.profile_data}>
                            <Typography variant="body2">{props.profile.name}</Typography>
                            <Link color="inherit" target="_blank" href={props.profile.link}>{props.profile.screen_name}</Link>
                        </Box>
                        <Button onClick={props.logoutThunk} color="inherit">Logout</Button>
                    </Toolbar>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin,
    profile: state.user.profile,
});

export default connect(mapStateToProps, {logoutThunk})(Header);
