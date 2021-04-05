import {userAPI} from "../api/user-api";
import {
    AuthorizeAPI,
    getAccessToken,
    removeAccessToken,
    setAccessToken
} from "../api/authorization-api";

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

export const logoutThunk = () => async (dispatch) => {
    // let response = await authAPI.logout();
    // if (response.data.resultCode === 0) {
    //     dispatch(loginUserActionCreator(null, false));
    // }
    removeAccessToken();
    dispatch(setProfileActionCreator(null, false));
}

function refreshToken() {
    return AuthorizeAPI.refreshToken().then((response) => {
        if (response.data?.access_token)
            setAccessToken(response.data.access_token)
    });
}
export const initUserProfile = () => (dispatch) => {
    if (getAccessToken()) {
        userAPI.getUserProfile().then(response => {
            dispatch(setProfileActionCreator(response.data.profile));
            setInterval(() => {
                refreshToken();
            }, 1000*60*0.5);
        }).catch(error => {
            if (error.response.data?.detail === "access_token expired"){
                refreshToken().then(()=>{
                    initUserProfile();
                });
            } else {
                console.error(error);
            }
        });
    }
}

export default UserReducer;
