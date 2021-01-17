import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaBuilding, FaUserCircle } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import { AuthConsumer, AuthContext } from "../providers/authProvider"
import { IDENTITY_CONFIG } from "../utils/authConst";
import { useInterval } from "../utils/useInterval";

export const Menu = () => {
  const authContext = useContext(AuthContext);

  const sessionInterval = process.env.REACT_APP_QUERY_SESSION_INTERVAL ? process.env.REACT_APP_QUERY_SESSION_INTERVAL * 1000 : 10000
  // this sets the intervall for active query session that runs as long as the Menu component exists
  useInterval(() => {
    authContext.querySessionStatus()
  }, sessionInterval);

  // Clear session uuid and allow new leader election
  window.addEventListener("beforeunload", (e) => {
    if (authContext.isAuthenticated() && IDENTITY_CONFIG.querySession === true) {
      e.preventDefault();
      console.log("authService: clear session uuid, restart leader election");
      return localStorage.removeItem('session');
    }
    return
  });

  return (
    <div >
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/employees" className="btn btn-header">
                <FaUserAlt />
                <span>Employees</span>
              </Link>
            </li>
            <li>
              <Link to="/departments" className="btn btn-header">
                <FaBuilding />
                <span>Departments</span>
              </Link>
            </li>

            <AuthConsumer>
              {({ isAuthenticated, getUserProfile }) => (
                isAuthenticated() &&
                <li>
                  <div className="user">Welcome, {getUserProfile().name}</div>
                </li>
              )}
            </AuthConsumer>

            <AuthConsumer>
              {({ isAuthenticated }) => (
                isAuthenticated() &&
                <li>
                  <Link to="/profile" className="btn btn-header">
                    <FaUserCircle />
                    <span>Profile</span>
                  </Link>
                </li>
              )}
            </AuthConsumer>

            <AuthConsumer>
              {({ isAuthenticated }) => (
                isAuthenticated() &&
                <li>
                  <Link to="/logout" className="btn btn-header">
                    <FiLogOut />
                    <span>Logout</span>
                  </Link>
                </li>
              )}
            </AuthConsumer>

          </ul>
        </nav>
      </header>
    </div>
  );
};