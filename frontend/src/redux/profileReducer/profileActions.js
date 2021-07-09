const actions = {
    set_profile: 'SET_PROFILE',

    __create_action: {
        setProfile: (profile, isLogin = true) => ({type: actions.set_profile, profile, isLogin}),
    }
}


export default actions;