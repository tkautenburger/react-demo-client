import React from "react";
import { AuthConsumer } from "../../providers/authProvider";
import { FaSpinner } from "react-icons/fa"

export const SilentRenew = () => (
    <AuthConsumer>
        {({ signinSilentCallback }) => {
            signinSilentCallback();
            return (
                <div className="app">
                    < p />
                    <FaSpinner className="icon-loading" />&nbsp;&nbsp;loading...
                </div>
            );
        }}
    </AuthConsumer>
);