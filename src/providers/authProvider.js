import React, {Component} from "react";
import AuthService from "../services/authService";

export const AuthContext = React.createContext({
    startSessionQueryTimer: () => ({}),
    querySessionStatus: () => ({}),
    signinRedirectCallback: () => ({}),
    getUserData: () => ({}),
    parseJwt: (token) => ({}),
    getUserProfile: () => ({}),
    getAccessToken: () => ({}),
    logout: () => ({}),
    signoutRedirectCallback: () => ({}),
    isAuthenticated: () => ({}),
    signinRedirect: () => ({}),
    signinSilentCallback: () => ({})
});

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
    authService;
    constructor(props) {
        super(props);
        this.authService = new AuthService();
    }
    render() {
        return <AuthContext.Provider value={this.authService}>{this.props.children}</AuthContext.Provider>;
    }
}
