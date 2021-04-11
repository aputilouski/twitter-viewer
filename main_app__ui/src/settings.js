let settings = {}

process.env.NODE_ENV !== "development" ?
    settings.API_URL = window.location.origin + "/api/" :
    settings.API_URL = process.env.REACT_APP_API_URL;


export default settings;
