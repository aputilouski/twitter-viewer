import {userAPI} from "../api/user-api";
import {stopSubmit} from "redux-form";
import {setAlertZoneActionCreator, setErrorMessage} from "./app-reduser";
import {addHistoryItem, clearTweets, setTweetsActionCreator} from "./twitter-reduser";

const SET_USER = 'SET_USER';

let initialState = {
    user: [],
    isLogin: false,
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.user,
                isLogin: action.isLogin
            };
        }
        default:
            return state;
    }
}

export const loginUserActionCreator = (user, isLogin = true) => ({type: SET_USER, user, isLogin})

export const loginUserThunk = (user) => async (dispatch) => {
    return userAPI.loginUser(user).then(response => {
        dispatch(loginUserActionCreator(user));
    }).catch(function (error) {
        dispatch(setAlertZoneActionCreator(setErrorMessage(error.response.data?.message || error.message)));
        setTimeout(() => {
            dispatch(stopSubmit("login", {_error: error.response.data?.message || error.message}));
        });
    });
};

export const logoutUserThunk = () => async (dispatch) => {
    // let response = await authAPI.logout();
    // if (response.data.resultCode === 0) {
        dispatch(loginUserActionCreator(null, false));
    // }
}

export default UserReducer;
