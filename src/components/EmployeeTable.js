import React, { useState, useEffect } from "react"
import { FaSpinner, FaExclamationCircle } from "react-icons/fa"

export default function EmployeeTable({ employee, setEmployee }) {
  const [employees, setEmployees] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/employees")
      .then(resp => resp.json())
      .then(data => {
        setEmployees(data);
        data.length > 0 && setEmployee(data[0])
      })
      .catch(error => setError(error));
  }, []);

  // Data is loading...
  if (employees === null && error === null) {
    return (
      <div className="app">
        <FaSpinner className="icon-loading" />&nbsp;Loading employee data...
      </div>
    );
  }

  // Error while loading data
  if (error !== null) {
    return (
      <div className="app">
        <FaExclamationCircle className="icon-loading" />&nbsp;{error.message}
      </div>
    );
  }

  function changeEmployee(e) {
    const result = employees.filter(emp => emp.empId.toString() === e.target.value);
    result.length > 0 && setEmployee(result[0]);
  }

  return (
    <div className="app">
      <h2>Employee List</h2>
      <select onChange={changeEmployee}>
        {employees.map(emp => (
          <option key={emp.empId} value={emp.empId}>{emp.empId} - {emp.lastName}, {emp.firstName}</option>
        ))}
      </select>
    </div>
  );
}