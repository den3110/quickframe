const getApiUrl = () =>
  window.location.hostname.indexOf("localhost") > -1
    ? process.env.REACT_APP_BASE_API_URL
    : `${window.location.protocol}//${window.location.hostname}/api`;

export const constant = {
  API_URL: getApiUrl(),
  URL_ASSETS_LOGO: getApiUrl() + "/assets/exchange",
  URL_AVATAR_URER: getApiUrl() + "/users/avatar/",
  URL_AVATAR_URER_NO_SLASH: getApiUrl() + "/users/avatar/",
};
