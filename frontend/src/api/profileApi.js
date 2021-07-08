import instance from "./_instance";


const profileApi = {
    getUserProfile() {
        return instance().post('profile/');
    }
}


export default profileApi;