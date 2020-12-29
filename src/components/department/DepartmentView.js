import React, { useReducer, Fragment } from "react"
import DepartmentForm from './DepartmentForm'
import DepartmentTable from './DepartmentTable'

import reducer from "./reducer";

// Initial state for the department list
const initialState = {
  departments: [],         // the list of departments 
  department: {},        // the current department object
  selectedDepartment: -1,  // the index of the selected department
  isLoading: true,         // data is currently loading
  isUpdating: false,       // current department is currently updated
  isDeleting: false,       // current department is currently deleted
  isAdding: false,         // new department is currently added
  isAddSubmit: false,      // user submitted new department
  error: false
}

export default function DepartmentView() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get the first entry in the list when we load the data for the very
  // first time. When the list is empty, unset the department entry

  if (state.selectedDepartment === -1 && state.departments.length > 0) {
    state.selectedDepartment = 0;
    state.department = state.departments[state.selectedDepartment];
  }  else if (state.departments.length === 0) {
    state.department = null;
  }
 
  return (
    <Fragment>
      <DepartmentTable state={state} dispatch={dispatch} />
      { state.department && <DepartmentForm state={state} dispatch={dispatch} />}
    </Fragment>
  );
}