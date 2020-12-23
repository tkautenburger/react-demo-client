import React from "react"
import DepartmentView from './DepartmentView'
import { Menu } from '../menu'

export function DepartmentPage() {
  return (
    <main className="main">
      <Menu />
      <DepartmentView />
    </main>
  );
}