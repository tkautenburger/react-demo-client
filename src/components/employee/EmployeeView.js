import React, { useReducer, Fragment } from "react"
import EmployeeForm from './EmployeeForm'
import EmployeeTable from './EmployeeTable'
import reducer from "./reducer";

// Initial state for the employee list
const initialState = {
  employees: [],
  departments: [], // department chooser to be displayed in employee dialog
  employee: {},
  selectedEmployee: -1,
  isLoading: true,
  isUpdating: false,
  isDeleting: false,
  isAddSubmit: false,
  error: false
}

export default function EmployeeView() {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.selectedEmployee === -1 && state.employees.length > 0) {
    state.selectedEmployee = 0;
    state.employee = state.employees[state.selectedEmployee];
  } else if (state.employees.length === 0) {  
    state.employee = null;
  }

  return (
    <Fragment>
      <EmployeeTable state={state} dispatch={dispatch}/>
      { state.employee && <EmployeeForm state={state} dispatch={dispatch} /> }
    </Fragment>
  );
}