import './App.css';
import React from "react";
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Login from "./components/LoginPage/Login";
import TwitterViewerPage from "./components/TwitterViewerPage";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import AlertZone from "./components/AlertZone";
import Cookies from 'js-cookie';


const theme = createMuiTheme({});
// console.log(theme)

function app_preparations() {
    const access_token = Cookies.get('access_token');
    if(access_token) {
        localStorage.setItem('access_token', access_token);
        Cookies.remove('access_token')
    }
}

class App extends React.Component {
    componentDidMount() {
        app_preparations();
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Provider store={store}>
                        <Switch>
                            <Route exact path='/'
                                   render={() => <Redirect to={"/login"}/>}/>

                            <Route path="/login"
                                   render={() => <Login/>}/>

                            <Route path="/main"
                                   render={() => <TwitterViewerPage/>}/>
                        </Switch>
                        <AlertZone/>
                    </Provider>
                </BrowserRouter>
            </ThemeProvider>
        );
    }
}

export default App;
