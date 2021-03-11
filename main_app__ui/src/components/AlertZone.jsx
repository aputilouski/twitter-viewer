import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {connect} from "react-redux";
import {disableMessage, setAlertZoneActionCreator} from "../redux/app-reduser";


const AlertZone = (props) => {
    const handleClose = () => {
        props.disableAlertZone();
    };
    return (
        <Snackbar open={props.alertZone.isActive}
                  autoHideDuration={6000}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.alertZone.status || "info"}>
                {props.alertZone.message}
            </Alert>
        </Snackbar>
    )
}


const mapStateToProps = (state) => ({
    alertZone: state.app.alertZone
});
const mapDispatchToProps = (dispatch) => ({
    disableAlertZone: () => {
        dispatch(setAlertZoneActionCreator(disableMessage()));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertZone)
