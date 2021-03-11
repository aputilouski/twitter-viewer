import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import TwitterReducer from "./twitter-reduser";
import { reducer as formReducer } from 'redux-form'
import UserReducer from "./user-reduser";
import AppReducer from "./app-reduser";


let reducers = combineReducers({
    form: formReducer,
    twitterPage: TwitterReducer,
    user: UserReducer,
    app: AppReducer,
});



const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;