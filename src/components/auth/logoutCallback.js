import React from "react";
import { AuthConsumer } from "../../providers/authProvider";
import { FaSpinner } from "react-icons/fa"

export const LogoutCallback = () => (
    <AuthConsumer>
        {({ signoutRedirectCallback }) => {
            signoutRedirectCallback();
            return (
                <div className="app">
                    < p />
                    <FaSpinner className="icon-loading" />&nbsp;&nbsp;loading...
                </div>
            );
        }}
    </AuthConsumer>
);