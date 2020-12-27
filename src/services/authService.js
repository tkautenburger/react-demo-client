import { IDENTITY_CONFIG, METADATA_OIDC } from "../utils/authConst";
import { UserManager, WebStorageStateStore, Log } from "oidc-client";

export default class AuthService {
    UserManager;

    constructor() {
        this.UserManager = new UserManager({
            ...IDENTITY_CONFIG,
            userStore: new WebStorageStateStore({ store: window.sessionStorage }),
            metadata: {
                ...METADATA_OIDC
            }
        });
        // Logger
        Log.logger = console;
        Log.level = Log.INFO;
        this.UserManager.events.addUserLoaded((user) => {
            if (window.location.href.indexOf("signin-oidc") !== -1) {
                this.navigateToScreen();
            }
        });
        this.UserManager.events.addSilentRenewError((e) => {
            console.log("silent renew error", e.message);
        });

        this.UserManager.events.addAccessTokenExpired(() => {
            console.log("access token expired");
            this.signinSilent();
        });
    }

    signinRedirectCallback = () => {
        this.UserManager.signinRedirectCallback()
            .then((user) => {
                // here we have the user object after successful login
           })
            .catch((err) => {
                console.log('signinRedirectCallback error: ', err);
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
        this.UserManager.getUser()
            .then((user) => {
                console.log("got user", user);
                return user;
            })
            .catch((err) => {
                console.log(err);
                return null;
            });
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
                console.log("signed in", user);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    signinSilentCallback = () => {
        this.UserManager.signinSilentCallback();
    };

    createSigninRequest = () => {
        return this.UserManager.createSigninRequest();
    };

    logout = () => {
        this.UserManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token")
        });
        this.UserManager.clearStaleState();
    };

    signoutRedirectCallback = () => {
        this.UserManager.signoutRedirectCallback().then(() => {
            localStorage.clear();
            window.location.replace("/");
        });
        this.UserManager.clearStaleState();
    };
}