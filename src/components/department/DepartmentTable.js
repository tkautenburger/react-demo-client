import React, { useEffect, useContext } from "react"
import { FaSpinner, FaExclamationCircle } from "react-icons/fa"
import { AuthContext } from "../../providers/authProvider";

export default function DepartmentTable({ state, dispatch }) {
  const { departments, department, isLoading, error } = state;
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // check if the user is authenticated before fetching the data
    // use the current access token to authenticate with the  
    // downstreamservice
    if (authContext.isAuthenticated()) {
      dispatch({ type: "FETCH_DEPARTMENTS_REQUEST" });

      fetch(process.env.REACT_APP_DEPARTMENT_SERVICE, {
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
          type: "FETCH_DEPARTMENTS_SUCCESS",
          payload: data
        })
      })
        .catch(error => dispatch({
          type: "DEPARTMENTS_ERROR",
          payload: error
        }));
    }
  }, [authContext, dispatch]);

  // Data is loading... TODO: this needs to be an individual message
  if (!error && isLoading) {
    return (
      <div className="app">
        <FaSpinner />&nbsp;Loading department data...
      </div>
    );
  }

  function changeDepartment(e) {
    const deptId = parseInt(e.target.value);
    // Update the current selected department in the state
    const dept = departments.find(d => d.deptId === deptId);
    dispatch({
      type: "SET_DEPARTMENT",
      payload: { deptId, dept }
    });
  }

  return (
    <div className="app">
      { error &&
        <div>
          <FaExclamationCircle style={{ marginRight: '1em' }} />{error.message}
        </div>
      }
      <h2>Available Departments</h2>
      <select onChange={changeDepartment} value={department.deptId}>
        {departments.map(dept => (
          <option key={dept.deptId} value={dept.deptId}>{dept.deptId} - {dept.name}</option>
        ))}
      </select>
    </div>
  );
}