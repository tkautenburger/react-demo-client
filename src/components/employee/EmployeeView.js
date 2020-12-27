import React, { useReducer, Fragment } from "react"
import EmployeeForm from './EmployeeForm'
import EmployeeTable from './EmployeeTable'
import reducer from "./EmployeeReducer";

// Initial state for the employee list
const initialState = {
  employees: [],
  selectedEmployee: 0,
  isLoading: true,
  error: false
}

export default function EmployeeView() {
  const [state, dispatch] = useReducer(reducer, initialState);

  let employee = null;
  if (state.selectedEmployee === 0 && state.employees.length > 0) {
    employee = state.employees[0];
  } else {  
    employee = state.employees.find(e => e.empId === state.selectedEmployee);
  }

  return (
    <Fragment>
      <EmployeeTable state={state} dispatch={dispatch}/>
      {employee && 
        <EmployeeForm employee={employee} /> }
    </Fragment>
  );
}