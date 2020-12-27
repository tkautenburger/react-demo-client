export const IDENTITY_CONFIG = {
  authority: process.env.REACT_APP_AUTHORITY, //(string): The URL of the OIDC provider.
  client_id: process.env.REACT_APP_CLIENT_ID, //(string): Your client application's identifier as registered with the OIDC provider.
  redirect_uri: process.env.REACT_APP_REDIRECT_URI, //The URI of your client application to receive a response from the OIDC provider.
  response_type: process.env.REACT_APP_RESPONSE_TYPE, //(string, default: 'id_token'): The type of response desired from the OIDC provider.
  scope: process.env.REACT_APP_SCOPE, //(string, default: 'openid'): The scope being requested from the OIDC provider.
  automaticSilentRenew: process.env.REACT_APP_SILENT_RENEW, //(boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
  silent_redirect_uri: process.env.REACT_APP_SILENT_REDIRECT_URI,
  loadUserInfo: process.env.REACT_APP_LOAD_USERINFO, //(boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
  // clockSkew: 30000,
  // staleStateAge: 30000,
  post_logout_redirect_uri: process.env.REACT_APP_LOGOUT_REDIRECT_URI// (string): The OIDC post-logout redirect URI.
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

};
