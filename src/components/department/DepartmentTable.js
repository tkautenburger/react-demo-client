import React, { useEffect } from "react"
import { FaSpinner, FaExclamationCircle } from "react-icons/fa"

export default function DepartmentTable({ state, dispatch }) {
  const { departments, isLoading, error } = state;

  useEffect(() => {
    dispatch({ type: "FETCH_DEPARTMENTS_REQUEST" });

    fetch("http://localhost:3001/departments")
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: "FETCH_DEPARTMENTS_SUCCESS",
          payload: data
        })
      })
      .catch(error => dispatch({
        type: "FETCH_DEPARTMENTS_ERROR",
        payload: error
      }));
  }, [dispatch]);

  // Error while loading data...
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
        <FaSpinner className="icon-loading" />&nbsp;Loading department data...
      </div>
    );
  }

  function changeDepartment(e) {
    const deptId = parseInt(e.target.value);
    dispatch({
      type: "SET_DEPARTMENT",
      payload: deptId
    });
  }

  return (
    <div className="app">
      <h2>Department List</h2>
      <select onChange={changeDepartment}>
        {departments.map(dept => (
          <option key={dept.deptId} value={dept.deptId}>{dept.deptId} - {dept.deptName}</option>
        ))}
      </select>
    </div>
  );
}