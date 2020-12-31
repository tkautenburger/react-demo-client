import React, { useEffect, useContext } from "react"
import { FaSpinner, FaExclamationCircle } from "react-icons/fa"
import { AuthContext } from "../../providers/authProvider";

export default function EmployeeTable({ state, dispatch }) {
  const { employees, employee, isLoading, error } = state;
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
      }).then(resp => {
        if (!resp.ok) {
          console.log("Response status: ", resp.status, resp.statusText);
          throw new Error(resp.status + ' - ' + resp.statusText);
        }
        return resp.json()
      }).then(data => {
        dispatch({
          type: "FETCH_EMPLOYEES_SUCCESS",
          payload: data
        })
      })
        .catch(error => dispatch({
          type: "EMPLOYEES_ERROR",
          payload: error
        }));
    }
  }, [authContext, dispatch]);

  // Data is loading...
  if (!error && isLoading) {
    return (
      <div className="app">
        <FaSpinner />&nbsp;Loading employee data...
      </div>
    );
  }

  function changeEmployee(e) {
    const empId = parseInt(e.target.value);
    // Update the current selected employee in the state
    const empl = employees.find(emp => emp.empId === empId);
    dispatch({
      type: "SET_EMPLOYEE",
      payload: { empId, empl }
    });
  }

  return (
    <div className="app">
      { error &&
        <div>
          <FaExclamationCircle style={{ marginRight: '1em' }} />{error.message}
        </div>
      }
     <h2>Available Employees</h2>
      <select onChange={changeEmployee} value={employee.empId}>
        {employees.map(emp => (
          <option key={emp.empId} value={emp.empId}>{emp.empId} - {emp.lastname}, {emp.firstname}</option>
        ))}
      </select>
    </div>
  );
}