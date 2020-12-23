export const IDENTITY_CONFIG = {
  authority: "https://auth-service:8443/auth/realms/Demo", //(string): The URL of the OIDC provider.
  client_id: "myApp", //(string): Your client application's identifier as registered with the OIDC provider.
  redirect_uri: "http://localhost:3000/signin-oidc", //The URI of your client application to receive a response from the OIDC provider.
  response_type: "code", //(string, default: 'id_token'): The type of response desired from the OIDC provider.
  scope: "openid profile email", //(string, default: 'openid'): The scope being requested from the OIDC provider.
  automaticSilentRenew: false, //(boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
  silent_redirect_uri: "http://localhost:3000//silentrenew",
  loadUserInfo: true, //(boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
  // clockSkew: 30000,
  // staleStateAge: 30000,
  post_logout_redirect_uri: "http://localhost:3000//logout/callback" // (string): The OIDC post-logout redirect URI.
};

export const METADATA_OIDC = {
  issuer: "https://auth-service:8443/auth/realms/Demo",
  jwks_uri: IDENTITY_CONFIG.authority + "/protocol/openid-connect/certs",
  authorization_endpoint: IDENTITY_CONFIG.authority  + "/protocol/openid-connect/auth",
  token_endpoint: IDENTITY_CONFIG.authority + "/protocol/openid-connect/token",
  userinfo_endpoint: IDENTITY_CONFIG.authority  + "/protocol/openid-connect/userinfo",
  end_session_endpoint: IDENTITY_CONFIG.authority  + "/protocol/openid-connect/logout",
  introspection_endpoint: IDENTITY_CONFIG.authority  + "/protocol/openid-connect/introspect"
};
