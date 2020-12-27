import React from "react";
import { AuthConsumer } from "../../providers/authProvider";
import { FaSpinner } from "react-icons/fa"

export const Callback = () => (
    <AuthConsumer>
        {({ signinRedirectCallback }) => {
            signinRedirectCallback();
            return (
                <div className="app">
                    < p />
                    <FaSpinner className="icon-loading" />&nbsp;&nbsp;loading...
                </div>
            );
        }}
    </AuthConsumer>
);