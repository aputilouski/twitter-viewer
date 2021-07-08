const SET_ALERT_DATA = 'SET_ALERT_DATA';


let initialState = {
    alertZone: {
        isActive: false,
        status: null,
        message: null,
    },
}


const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALERT_DATA: {
            return {
                ...state,
                alertZone: action.alertZone,
            };
        }
        default:
            return state;
    }
}


export const DefaultMessages = {
    SERVER_ERROR_MESSAGE: "Oops. Something went wrong. Please try again later.",
    INTERNET_CONNECTION_ERROR_MESSAGE: "Please, check you Internet connection.",
    NO_TOKEN_ERROR_MESSAGE: "Credentials Error! Please, try to re-login.",
}


// Action Creators
export const CreateAlertAction = {
    setAlertZone: (alertZone) => ({type: SET_ALERT_DATA, alertZone}),
    setAlertZoneErrorMessage: (message) => ({type: SET_ALERT_DATA,
        alertZone: {isActive: true, status: "error", message: message || DefaultMessages.SERVER_ERROR_MESSAGE}}),
    disableAlertZone: () => ({type: SET_ALERT_DATA,
        alertZone: {isActive: false, status: false, message: false}}),
}


export default AppReducer;
