import instance from "./_instance";
import addResponseHandler from "../utils/ResponseHandler";


const profileApi = {
    getUserProfile() {
        const requestThunk = () => {
            return instance().post('profile/');
        }

        return addResponseHandler(requestThunk)
    }
}


export default profileApi;