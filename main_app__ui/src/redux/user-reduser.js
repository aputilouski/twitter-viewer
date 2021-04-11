import {userAPI} from "../api/user-api";
import {AuthorizeAPI, getAccessToken, refreshToken, removeAccessToken,} from "../api/authorization-api";
import {setAlertZoneActionCreator, setErrorMessage} from "./app-reduser";
import {DEFAULT_SERVER_ERROR_MESSAGE} from "../api/api";

const SET_PROFILE = 'SET_PROFILE';

let initialState = {
    profile: [],
    isLogin: false,
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE: {
            return {
                ...state,
                profile: action.profile,
                isLogin: action.isLogin
            };
        }
        default:
            return state;
    }
}

export const setProfileActionCreator = (profile, isLogin = true) => ({type: SET_PROFILE, profile, isLogin})

export const logoutThunk = () => (dispatch) => {
    removeAccessToken();
    dispatch(setProfileActionCreator(null, false));
}

export const getTwitterAuthorizePage = () => (dispatch) => {
    return AuthorizeAPI.getTwitterAuthorizePage().then(response => {
        if (response.data?.url)
            document.location.href = response.data.url
        else dispatch(setAlertZoneActionCreator(setErrorMessage(DEFAULT_SERVER_ERROR_MESSAGE)));

    });
}

let timerId = null;

export const initUserProfile = () => (dispatch) => {
    if (getAccessToken()) {
        userAPI.getUserProfile(dispatch, initUserProfile).then(response => {
            dispatch(setProfileActionCreator(response.data.profile));
            if (timerId)
                clearInterval(timerId);
            timerId = setInterval(() => {
                refreshToken(dispatch);
            }, 1000*60*0.5);
        });
    }
}

export default UserReducer;
