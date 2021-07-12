import React from "react";
import {Provider} from "react-redux";
import store from "./redux/_store";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import BaseTemplate from "./components/BasePages/BaseTemplate";


const theme = createMuiTheme({});
// console.log(theme)


class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Provider store={store}>
                        <Switch>
                            <Route exact path='/'
                                   render={() => <Redirect to={"/main"}/>}/>

                            <Route render={() => <BaseTemplate/>}/>
                        </Switch>
                    </Provider>
                </BrowserRouter>
            </ThemeProvider>
        );
    }
}


export default App;
