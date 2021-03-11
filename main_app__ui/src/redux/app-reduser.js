import {DEFAULT_SERVER_ERROR_MESSAGE} from "../api/api";

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

export const setAlertZoneActionCreator = (alertZone) => ({type: SET_ALERT_DATA, alertZone})

export function setErrorMessage(message) {
    return {isActive: true, status: "error", message: message || DEFAULT_SERVER_ERROR_MESSAGE}
}
export function disableMessage() {
    return {isActive: false, status: false, message: false}
}

export default AppReducer;
