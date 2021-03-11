import instance from "./api";

export const userAPI = {
    loginUser(user) {
        return instance.post(`login/`, {user: user})
            .then(response => {
                return response;
            });
    },
}
