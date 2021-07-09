import AuthorizationAPI from "../../api/authorizationApi";
import profileApi from "../../api/profileApi";
import refreshToken from "../../utils/RefreshToken";
import AccessToken from "../../utils/AccessToken";
import actions from "./profileActions";


// Thunks
export const ProfileManager = {
    getTwitterAuthorizePage: () => (dispatch) => {
        return AuthorizationAPI.getTwitterAuthorizePage().then(response => {
            if (response.data?.url)
                document.location.href = response.data.url
            else throw new Error();
        });
    },
    initUserProfile: () => (dispatch) => {
        let timerId = null;
        return profileApi.getUserProfile().then(response => {
            dispatch(actions.__create_action.setProfile(response.data.profile));
            if (timerId)
                clearInterval(timerId);
            timerId = setInterval(() => {
                refreshToken(dispatch);
            }, 1000*60*4);
        });
    },
    logout: () => (dispatch) => {
        AccessToken.removeAccessToken();
        dispatch(actions.__create_action.setProfile(null, false));
    },
}


export default ProfileManager;
