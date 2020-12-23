import React from "react";
import EmployeeView from './EmployeeView'
import { Menu } from '../menu'

export function EmployeePage() {
  return (
    <main className="main">
      <Menu />
      <EmployeeView />
    </main>
  );
}
