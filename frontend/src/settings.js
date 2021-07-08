const settings = {}


settings.API_URL = process.env.NODE_ENV !== "development" ? window.location.origin + "/api/" : process.env.REACT_APP_API_URL;


export default settings;
