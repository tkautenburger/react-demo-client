import { IDENTITY_CONFIG, METADATA_OIDC } from "../utils/authConst";
import { UserManager, WebStorageStateStore, Log } from "oidc-client";
import { v4 as uuidv4 } from 'uuid';

export default class AuthService {
    UserManager;
    uuid;

    constructor() {

        this.uuid = uuidv4();
        this.UserManager = new UserManager({
            ...IDENTITY_CONFIG,
            userStore: new WebStorageStateStore({ store: window.sessionStorage }),
            metadata: {
                ...METADATA_OIDC
            }
        });
        // Configure Logger
        Log.logger = console;
        Log.level = Log.DEBUG;

        this.UserManager.events.addUserLoaded((user) => {
            if (window.location.href.indexOf("signin-oidc") !== -1) {
                this.navigateToScreen();
            }
        });

        this.UserManager.events.addSilentRenewError((e) => {
            Log.warn("silent renew error, log out user", e.message);
            // logout if a silent renew error occurs
            this.logout();
        });

        this.UserManager.events.addAccessTokenExpired(() => {
            // if silent renew is enabled then do it otherwhise logout
            if (IDENTITY_CONFIG.automaticSilentRenew) {
                Log.info("access token expired: trigger silent renew")
                this.signinSilent();
            } else {
                Log.info("access token expired: trigger logout");
                this.logout();
            }
        });

        this.UserManager.events.addUserSignedOut(() => {
            // session has been terminated at the authentcation service
            Log.info("user has been signed out");
            this.logout();
        });

    }

    startSessionQueryTimer = () => {
        // user has been logged in after redirect to auth server, navigate to requested URL
        if (IDENTITY_CONFIG.querySession && this.timerId === null) {
            this.timerId = setInterval(this.querySessionStatus, IDENTITY_CONFIG.querySessionInterval);
            Log.debug("session query started, id: ", this.timerId);
            Log.debug("querying session interval: ", IDENTITY_CONFIG.querySessionInterval / 1000);
        }
    };

    signinRedirectCallback = () => {
        this.UserManager.signinRedirectCallback()
            .then((user) => {
                // here we have the user object after successful login
            })
            .catch((err) => {
                Log.warn('signinRedirectCallback error: ', err);
            });
    };


    getUser = async () => {
        const user = await this.UserManager.getUser();
        if (user === null || user === undefined) {
            return await this.UserManager.signinRedirectCallback();
        }
        return user;
    };

    parseJwt = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };


    signinRedirect = () => {
        localStorage.setItem("redirectUri", window.location.pathname);
        this.UserManager.signinRedirect({});
    };


    navigateToScreen = () => {
        const uri = localStorage.getItem("redirectUri");
        window.location.replace(uri);
    };


    isAuthenticated = () => {
        const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${IDENTITY_CONFIG.authority}:${IDENTITY_CONFIG.client_id}`))
        return (!!oidcStorage && !!oidcStorage.access_token)
    };

    getUserData = () => {
        const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${IDENTITY_CONFIG.authority}:${IDENTITY_CONFIG.client_id}`))
        if (!!oidcStorage && !!oidcStorage.access_token) {
            return oidcStorage;
        }
        return null;
    };

    getUserProfile = () => {
        const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${IDENTITY_CONFIG.authority}:${IDENTITY_CONFIG.client_id}`))
        if (!!oidcStorage && !!oidcStorage.access_token) {
            return oidcStorage.profile;
        }
        return null;
    };

    getAccessToken = () => {
        const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${IDENTITY_CONFIG.authority}:${IDENTITY_CONFIG.client_id}`))
        if (!!oidcStorage && !!oidcStorage.access_token) {
            return oidcStorage.access_token;
        }
        return null;
    };

    signinSilent = () => {
        this.UserManager.signinSilent()
            .then((user) => {
                Log.info("signed in", user);
            })
            .catch((err) => {
                Log.warn(err);
            });
    };

    signinSilentCallback = () => {
        this.UserManager.signinSilentCallback()
            .catch((err) => {
                Log.error(err);
            });
    };

    createSigninRequest = () => {
        return this.UserManager.createSigninRequest();
    };

    logout = () => {
        this.UserManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token")
        });
        this.UserManager.clearStaleState();
        // clear the leader uuid in session storage
        localStorage.removeItem('session');
    };

    signoutRedirectCallback = () => {
        this.UserManager.signoutRedirectCallback().then(() => {
            localStorage.clear();
            window.location.replace("/");
        });
        this.UserManager.clearStaleState();
    };

    querySessionStatus = () => {
        if (this.isAuthenticated() && IDENTITY_CONFIG.querySession === true) {
            // get the session leader UUID from local storage
            const sessionString = localStorage.getItem('session');
            const session = sessionString ? JSON.parse(sessionString) : null;
            // check if there is no session status at all or 
            // if we are the leader
            if (!session || session.uuid === this.uuid) {
                // we are the leader, therefore do a real session status query
                this.remoteQuery();
                Log.debug("in query leader with UUID: ", this.uuid);
            } else {
                // we are not the leader, just do nothing
                Log.debug("in query follower with UUID: ", this.uuid);
            }
        }
    };

    remoteQuery = () => {
        this.UserManager.querySessionStatus()
            .then((status) => {
                const value = JSON.stringify({ 'uuid': this.uuid });
                localStorage.setItem('session', value);
                Log.debug("Query Session Status:", value);
            }).catch((err) => {
                Log.warn("Query Session Status error: ", err);
                this.logout();
            });
    };
}