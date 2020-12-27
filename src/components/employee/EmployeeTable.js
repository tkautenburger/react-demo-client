import React, { useEffect, useContext } from "react"
import { FaSpinner, FaExclamationCircle } from "react-icons/fa"
import { AuthContext } from "../../providers/authProvider";

export default function EmployeeTable({ state, dispatch }) {
  const { employees, isLoading, error } = state;
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // check if the user is authenticated before fetching the data
    // use the current access token to authenticate with the  
    // downstreamservice
    if (authContext.isAuthenticated()) {
      dispatch({ type: "FETCH_EMPLOYEES_REQUEST" });

      fetch(process.env.REACT_APP_EMPLOYEE_SERVICE, {
        method: 'GET',
        headers: {
          'Content-Type': 'applicaton/json',
          'authorization': 'Bearer ' + authContext.getAccessToken()
        }
      }).then(resp => resp.json())
        .then(data => {
          dispatch({
            type: "FETCH_EMPLOYEES_SUCCESS",
            payload: data
          })
        })
        .catch(error => dispatch({
          type: "FETCH_EMPLOYEES_ERROR",
          payload: error
        }));
    }
  }, [authContext, dispatch]);

  // Error while loading data
  if (error) {
    return (
      <div className="app">
        <FaExclamationCircle className="icon-loading" />&nbsp;{error.message}
      </div>
    );
  }
  
  // Data is loading...
  if (isLoading) {
    return (
      <div className="app">
        <FaSpinner className="icon-loading" />&nbsp;Loading employee data...
      </div>
    );
  }

  function changeEmployee(e) {
    const empId = parseInt(e.target.value);
    dispatch({
      type: "SET_EMPLOYEE",
      payload: empId
    });
  }

  return (
    <div className="app">
      <h2>Employee List</h2>
      <select onChange={changeEmployee}>
        {employees.map(emp => (
          <option key={emp.empId} value={emp.empId}>{emp.empId} - {emp.lastname}, {emp.firstname}</option>
        ))}
      </select>
    </div>
  );
}