import React from 'react';
import {
    AppBar,Toolbar, Typography, Button, Container, Avatar, Box, Link, Tabs, Tab,
    Tooltip, CircularProgress, Fade, Popper, Paper
} from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import { useHistory } from "react-router-dom";
import ProfileManager from "../../../redux/profileReducer/profileManager";
import clsx from "clsx";


const useStyles = makeStyles((theme) => {
    return {
        root: {
            flexGrow: 1,
        },
        font_size: {
            [theme.breakpoints.down('xs')]: {
                fontSize: '0.8rem',
                lineHeight: 1.2,
            },
        },
        profile_data: {
            margin: "0 40px 0 10px",
            [theme.breakpoints.up('md')]: {
                color: 'white',
            },
            [theme.breakpoints.down('sm')]: {
                margin: 0,
                padding: 8,
                borderBottom: `1px solid ${theme.palette.text.secondary}`
            },
        },
        loginTooltip: {
            margin: 0,
        },
        logoutButton: {
            [theme.breakpoints.up('md')]: {
                color: 'white',
            },
            [theme.breakpoints.down('sm')]: {
                color: theme.palette.secondary.main,
            },
        },
    }
});


const HeaderMenuButtons = [
    {id: 0, name: 'Main', path: '/main'},
    {id: 1, name: 'About', path: '/about'},
]


const UserData = (props) => {
    const classes = useStyles();
    return (<>
        <Box className={classes.profile_data}>
            <Typography variant="body2">{props.profile.name}</Typography>
            <Link target="_blank" color="inherit" href={props.profile.link}>{props.profile.screen_name}</Link>
        </Box>
        <Button onClick={props.logout} className={clsx(classes.font_size, classes.logoutButton)}>Logout</Button>
    </>)
}


const Header = (props) => {
    const classes = useStyles();
    let history = useHistory();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


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


    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6" className={clsx(classes.root, classes.font_size)}>TWITTER VIEWER</Typography>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        centered
                    >
                        {
                            HeaderMenuButtons.map((element, index) => {
                                return <Tab className={classes.font_size} key={index} label={element.name} />
                            })
                        }
                    </Tabs>

                    <Toolbar>
                        {
                            props.profile &&
                                <>
                                    {
                                        !isMobile && <>
                                            <Avatar src={props.profile.image} />
                                            <UserData {...props} />
                                        </>
                                    }
                                    {
                                        isMobile && <>
                                            <Avatar src={props.profile.image} onClick={handleClick} />
                                            <Popper open={open} anchorEl={anchorEl} transition>
                                                {({ TransitionProps }) => (
                                                    <Fade {...TransitionProps} timeout={350}>
                                                        <Paper>
                                                            <Box p={1}>
                                                                <UserData {...props} />
                                                            </Box>
                                                        </Paper>
                                                    </Fade>
                                                )}
                                            </Popper>
                                        </>
                                    }
                                </>
                        }
                        {
                        !props.profile &&
                            <Tooltip title="Twitter authentication" classes={{tooltip: classes.loginTooltip}} className={classes.font_size} TransitionComponent={Fade} leaveDelay={200}>
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
