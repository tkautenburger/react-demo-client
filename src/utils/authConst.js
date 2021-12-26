export const IDENTITY_CONFIG = {
  authority: process.env.REACT_APP_AUTHORITY, //(string): The URL of the OIDC provider.
  client_id: process.env.REACT_APP_CLIENT_ID, //(string): Your client application's identifier as registered with the OIDC provider.
  redirect_uri: process.env.REACT_APP_REDIRECT_URI, //The URI of your client application to receive a response from the OIDC provider.
  response_type: process.env.REACT_APP_RESPONSE_TYPE, //(string, default: 'id_token'): The type of response desired from the OIDC provider.
  scope: process.env.REACT_APP_SCOPE, //(string, default: 'openid'): The scope being requested from the OIDC provider.
  silent_redirect_uri: process.env.REACT_APP_SILENT_REDIRECT_URI,
  automaticSilentRenew: (process.env.REACT_APP_SILENT_RENEW.toLowerCase() === 'true'), //(boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
  loadUserInfo: (process.env.REACT_APP_LOAD_USERINFO.toLowerCase() === 'true'), //(boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
  monitorSession: (process.env.REACT_APP_MONITOR_SESSION.toLowerCase() === 'true'), // must be set to true, otherwhise the access token expiration is not recognized by oidc-client
  // staleStateAge: 30000,
  post_logout_redirect_uri: process.env.REACT_APP_LOGOUT_REDIRECT_URI, // (string): The OIDC post-logout redirect URI.
  querySession: (process.env.REACT_APP_QUERY_SESSION.toLowerCase() === 'true'), // enable / disable active session queriying
  querySessionInterval: process.env.REACT_APP_QUERY_SESSION_INTERVAL * 1000, // interval in seconds to query the session status
  referrerURI: process.env.REACT_APP_REFERRER_URI
};

export const METADATA_OIDC = {
  issuer: process.env.REACT_APP_AUTHORITY,
  jwks_uri: process.env.REACT_APP_AUTHORITY + "/protocol/openid-connect/certs",
  authorization_endpoint: process.env.REACT_APP_AUTHORITY  + "/protocol/openid-connect/auth",
  token_endpoint: process.env.REACT_APP_AUTHORITY + "/protocol/openid-connect/token",
  userinfo_endpoint: process.env.REACT_APP_AUTHORITY  + "/protocol/openid-connect/userinfo",
  end_session_endpoint: process.env.REACT_APP_AUTHORITY  + "/protocol/openid-connect/logout",
  introspection_endpoint: process.env.REACT_APP_AUTHORITY  + "/protocol/openid-connect/introspect",
  check_session_iframe: process.env.REACT_APP_AUTHORITY  + "/protocol/openid-connect/login-status-iframe.html"
  // check_session_iframe with keycloak seems not to work, therefore monitorSession must be set to false
};

export const CUSTOM_CONFIG = {
  accessTokenExpiringNotificationTime: process.env.REACT_APP_EXPIRING_NOTIFICATION_TIMER
};
