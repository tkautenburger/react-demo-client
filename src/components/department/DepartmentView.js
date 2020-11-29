import React, { useReducer, Fragment } from "react"
import DepartmentForm from './DepartmentForm'
import DepartmentTable from './DepartmentTable'

import reducer from "./reducer";

// Initial state for the department list
const initialState = {
  departments: [],
  selectedDepartment: 4711,
  isLoading: true,
  error: false
}

export default function DepartmentView() {
  const [state, dispatch] = useReducer(reducer, initialState);

  let department = null;
  const result = state.departments.filter(d => d.deptId === state.selectedDepartment);
  if (result.length > 0) {
    department = result[0];
  }
  
  return (
    <Fragment>
      <DepartmentTable state={state} dispatch={dispatch}/>
      {department && 
        <DepartmentForm department={department} /> }
    </Fragment>
  );
}