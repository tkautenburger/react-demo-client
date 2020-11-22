import React from "react";
import DepartmentForm from './DepartmentForm'

import {departments} from '../data.json'

export default function DepartmentPage() {
  return (
    <main className="main">
      <DepartmentForm department={ departments[0] } />
    </main>
  );
}