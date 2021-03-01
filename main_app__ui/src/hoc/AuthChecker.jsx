import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


let mapStateToPropsForRedirect = (state) => ({
    isLogin: state.user.isLogin
});

const AuthChecker = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isLogin) return <Redirect to='/login' />
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}

export default AuthChecker