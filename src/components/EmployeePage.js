import React from "react";
import EmployeeForm from './EmployeeForm'

import {employees} from '../data.json'

export default function EmployeePage() {
  return (
    <main className="main">
      <EmployeeForm employee={ employees[0] } />
    </main>
  );
}
