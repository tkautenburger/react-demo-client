import React, { useReducer, Fragment } from "react"
import DepartmentForm from './DepartmentForm'
import DepartmentTable from './DepartmentTable'

import reducer from "./reducer";

// Initial state for the department list
const initialState = {
  departments: [],
  selectedDepartment: 0,
  isLoading: true,
  error: false
}

export default function DepartmentView() {
  const [state, dispatch] = useReducer(reducer, initialState);

  let department = null;
  if (state.selectedDepartment === 0 && state.departments.length > 0) {
    department = state.departments[0];
  } else {  
    department = state.departments.find(d => d.deptId === state.selectedDepartment);
  }
  return (
    <Fragment>
      <DepartmentTable state={state} dispatch={dispatch}/>
      {department && 
        <DepartmentForm department={department} /> }
    </Fragment>
  );
}