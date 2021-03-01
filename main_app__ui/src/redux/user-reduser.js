import {userAPI} from "../api/user-api";
import {stopSubmit} from "redux-form";

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
    let response = await userAPI.loginUser(user);
    if(response.error){
        dispatch(stopSubmit("login", {_error: response.message}));
    }
    else {
        dispatch(loginUserActionCreator(user));
    }
}

export const logoutUserThunk = () => async (dispatch) => {
    // let response = await authAPI.logout();
    // if (response.data.resultCode === 0) {
        dispatch(loginUserActionCreator(null, false));
    // }
}

export default UserReducer;
