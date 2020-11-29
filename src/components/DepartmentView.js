import React, { useState, Fragment } from "react"
import DepartmentForm from './DepartmentForm'
import DepartmentTable from './DepartmentTable'

export default function DepartmentView() {
  const [department, setDepartment] = useState(null);

  return (
    <Fragment>
      <DepartmentTable department={department} setDepartment={setDepartment} />
      {department && <DepartmentForm department={department} />}
    </Fragment>
  );
}