import './App.css';
import React from "react";
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import LoginPage from "./components/LoginPage/Login";
import TwitterViewerPage from "./components/TwitterViewerPage";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import AlertZone from "./components/AlertZone";

const theme = createMuiTheme({});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Provider store={store}>
                    <Switch>
                        <Route exact path='/'
                               render={() => <Redirect to={"/login"}/>}/>

                        <Route path="/login"
                               render={() => <LoginPage/>}/>

                        <Route path="/main"
                               render={() => <TwitterViewerPage/>}/>
                    </Switch>
                    <AlertZone />
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
  );
}

export default App;
