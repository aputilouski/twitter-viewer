import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Avatar,
    Box,
    Link,
    Tabs,
    Tab,
    Tooltip, CircularProgress
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import { useHistory } from "react-router-dom";
import ProfileManager from "../../../redux/profileReducer/profileManager";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    profile_data: {
        margin: "0 40px 0 10px",
    }
}));

const HeaderMenuButtons = [
    {id: 0, name: 'Main', path: '/main'},
    {id: 1, name: 'About', path: '/about'},
]

const Header = (props) => {
    const classes = useStyles();
    let history = useHistory();

    let PageID = 0;
    for (let i = 0, element = HeaderMenuButtons[i]; i < HeaderMenuButtons.length; i++) {
        if (history.location.pathname === element.path) {
            PageID = element.id;
            break;
        }
    }

    const [value, setValue] = React.useState(PageID);
    const [isDisabledLoginButton, disableLoginButton] = React.useState(false);


    const handleChange = (event, newValue) => {
        if (newValue === value) return;

        setValue(newValue);

        for (let i = 0; i < HeaderMenuButtons.length; i++) {
            const element = HeaderMenuButtons[i];
            if (newValue === element.id) {
                history.push(element.path);
                break;
            }
        }
    };


    const login = async () => {
        if (isDisabledLoginButton) return;
        disableLoginButton(true);
        await props.login();
        disableLoginButton(false);
    }

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6" className={classes.root}>TWITTER VIEWER</Typography>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        centered
                    >
                        {
                            HeaderMenuButtons.map((element, index) => {
                                return <Tab key={index} label={element.name} />
                            })
                        }
                    </Tabs>

                    <Toolbar>
                        {
                            props.profile &&
                                <>
                                    <Avatar src={props.profile.image} />
                                    <Box className={classes.profile_data}>
                                        <Typography variant="body2">{props.profile.name}</Typography>
                                        <Link color="inherit" target="_blank" href={props.profile.link}>{props.profile.screen_name}</Link>
                                    </Box>
                                    <Button onClick={props.logout} color="inherit">Logout</Button>
                                </>
                        }
                        {
                        !props.profile &&
                            <Tooltip title="Twitter authentication">
                                <Button onClick={login} color="inherit">
                                    {
                                        !isDisabledLoginButton ? <>Login</> : <CircularProgress size={20} color="inherit" />
                                    }
                                </Button>
                            </Tooltip>
                        }

                    </Toolbar>
                </Toolbar>
            </Container>
        </AppBar>
    );
}


const mapStateToProps = (state) => {
    return {
        isLogin: state.user.isLogin,
        profile: state.user.profile,
    }
};
const mapDispatchToProps = (dispatch) => ({
    login: () => {
        return dispatch(ProfileManager.getTwitterAuthorizePage());
    },
    logout: () => {
        dispatch(ProfileManager.logout());
    }
});


export default connect(mapStateToProps,mapDispatchToProps)(Header);
