import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import ProfileReducer from "./profileReducer";
import AppReducer from "./appReducer";
import ViewerReducer from "./viewerReducer";


let reducers = combineReducers({
    form: formReducer,
    twitterPage: ViewerReducer,
    user: ProfileReducer,
    app: AppReducer,
});


const store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;