import actions from "./profileActions";


let initialState = {
    profile: null,
    isLogin: false,
}


const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.set_profile: {
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


export default ProfileReducer;
