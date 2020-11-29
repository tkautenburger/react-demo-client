import React, { useState, useEffect } from "react"
import { FaSpinner, FaExclamationCircle } from "react-icons/fa"

export default function DepartmentTable( {department, setDepartment} ) {
  const [departments, setDepartments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/departments")
      .then(resp => resp.json())
      .then(data => {
        setDepartments(data)
        data.length > 0 && setDepartment(data[0])
      })
      .catch(error => setError(error));
  }, []);

  // Data is loading...
  if (departments === null && error === null) {
    return (
      <div className="app">
        <FaSpinner className="icon-loading" />&nbsp;Loading department data...
      </div>
    );
  }

  // Error while loading data...
  if (error !== null) {
    return (
      <div className="app">
        <FaExclamationCircle className="icon-loading" />&nbsp;{error.message}
      </div>
    );
  }

  function changeDepartment (e) {
    const result = departments.filter(d => d.deptId.toString() === e.target.value);
    result.length > 0 && setDepartment(result[0]);
  }

  return (
    <div className="app">
      <select onChange={changeDepartment}>
        {departments.map(dept => (
          <option key={dept.deptId} value={dept.deptId}>{dept.deptId} - {dept.deptName}</option>
        ))}
      </select>
    </div>
  );
}