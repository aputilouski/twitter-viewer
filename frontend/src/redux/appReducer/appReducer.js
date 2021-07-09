import actions from './appActions'


let initialState = {
    alertZone: {
        isActive: false,
        status: null,
        message: null,
    },
}


const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.set_alert_data: {
            return {
                ...state,
                alertZone: action.alertZone,
            };
        }
        default:
            return state;
    }
}


export default AppReducer;
