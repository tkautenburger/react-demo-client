import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaBuilding, FaUserCircle } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import { AuthConsumer, AuthContext } from "../providers/authProvider"
import { useInterval } from "../utils/useInterval";

export const Menu = () => {
  const authContext = useContext(AuthContext);

  useInterval(() => {
    authContext.querySessionStatus()
  }, process.env.REACT_APP_QUERY_SESSION_INTERVAL * 1000);

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