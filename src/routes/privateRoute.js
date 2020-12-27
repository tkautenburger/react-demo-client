import React from "react";
import { Route } from "react-router-dom";
import { AuthConsumer } from "../providers/authProvider";
import { FaSpinner } from "react-icons/fa"

export const PrivateRoute = ({ component, ...rest }) => {
    const renderFn = (Component) => (props) => (
        <AuthConsumer>
            {({ isAuthenticated, signinRedirect }) => {
                if (!!Component && isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    signinRedirect();
                    return (
                    <div className="app">
                      < p />
                      <FaSpinner className="icon-loading" />&nbsp;&nbsp;loading...
                    </div>
                    );
                }
            }}
        </AuthConsumer>
    );

    return <Route {...rest} render={renderFn(component)} />;
};