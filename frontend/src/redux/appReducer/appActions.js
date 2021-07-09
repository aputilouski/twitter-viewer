const actions = {
    set_alert_data: 'SET_ALERT_DATA',

    __create_action: {
        setAlertZone: (alertZone) => ({type: actions.set_alert_data, alertZone}),
        setAlertZoneErrorMessage: (message) => ({type: actions.set_alert_data,
            alertZone: {isActive: true, status: "error", message: message || DefaultMessages.SERVER_ERROR_MESSAGE}}),
        disableAlertZone: () => ({type: actions.set_alert_data,
            alertZone: {isActive: false, status: false, message: false}}),
    }
}


export default actions;



export const DefaultMessages = {
    SERVER_ERROR_MESSAGE: "Oops. Something went wrong. Please try again later.",
    INTERNET_CONNECTION_ERROR_MESSAGE: "Please, check you Internet connection.",
    NO_TOKEN_ERROR_MESSAGE: "Credentials Error! Please, try to re-login.",
}
