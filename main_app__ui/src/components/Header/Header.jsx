import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {logoutUserThunk} from "../../redux/user-reduser";

const Header = (props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Twitter Viewer
                </Typography>
                {/*<Button component={Link} to={'/login'} color="inherit">Login</Button>*/}
                <Button onClick={props.logoutUserThunk} color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
    );
}
const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin,
});

export default connect(mapStateToProps, {logoutUserThunk})(Header);
