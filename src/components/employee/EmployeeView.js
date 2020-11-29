import React, { useState, Fragment } from "react"
import EmployeeForm from './EmployeeForm'
import EmployeeTable from './EmployeeTable'

export default function EmployeeView() {
  const [employee, setEmployee] = useState(null);

  return (
    <Fragment>
      <EmployeeTable employee={employee} setEmployee={setEmployee} />
      {employee && <EmployeeForm employee={employee} />}
    </Fragment>
  );
}