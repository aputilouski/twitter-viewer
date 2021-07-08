import React from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import Header from "./_components/Header";
import Container from "@material-ui/core/Container";
import AboutPage from "./AboutPage/AboutPage";
import ViewerPage from "./ViewerPage/ViewerPage";
import AlertZone from "./_components/AlertZone";
import ProfileManager from "../../redux/profileManager";
import AccessToken from "../../utils/AccessToken";

// import AuthChecker from "../hoc/AuthChecker";


class BaseTemplate extends React.Component {
    componentDidMount() {
        if (AccessToken.value) {
            this.setState({isInitializationProfileAction: true});
            this.props.initUserProfile().catch(err => {
                this.setState({isInitializationProfileAction: false});
            });
        }
    }
    render() {
        return (
            <>
                <Header/>
                <Container maxWidth="lg">
                    <Route path="/main"
                           render={() => <ViewerPage/>}/>
                    <Route path="/about"
                           render={() => <AboutPage/>}/>
                </Container>
                <AlertZone/>
            </>
        )
    }
}


// export default AuthChecker(TwitterViewerPage)
export default connect(
    (state) => ({}),
    (dispatch) => ({
        initUserProfile: () => {
            return dispatch(ProfileManager.initUserProfile());
        }
    })
)(BaseTemplate)
