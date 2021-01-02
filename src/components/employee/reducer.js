/*********************************
 * Employee Domain Reducer
 *********************************/

export default function reducer(state, action) {
  switch (action.type) {

    case "SET_EMPLOYEE":
      return {
        ...state,
        selectedEmployee: action.payload.empId,
        employee: action.payload.empl,
        isUpdating: false,
        isAdding: false,
        isDeleting: false,
        error: false
      };

    case "FETCH_EMPLOYEES_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: false,
        employees: []
      };

    case "FETCH_DEPTLIST_REQUEST":
      return {
        ...state,
        isLoading: true,
        departments: [],
        error: false
      };

    case "FETCH_EMPLOYEES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isUpdating: false,
        isDeleting: false,
        employees: action.payload.sort((a, b) => a.empId - b.empId)
      };

    case "FETCH_DEPTLIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isUpdating: false,
        isDeleting: false,
        departments: action.payload
      };

    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        isUpdating: true,
        error: false,
        employee: action.payload
      };

    case "UPDATE_EMPLOYEE_SUCCESS":
      // Update employee element in the employee list with the actual value 
      // returned from the backend service
      const empsAfterUpdate = state.employees.map((emp) =>
        (emp.empId === action.payload.empId ? action.payload : emp));
      return {
        ...state,
        isUpdating: false,
        employee: action.payload,
        employees: empsAfterUpdate
      };

    case "DELETE_EMPLOYEE":
      return {
        ...state,
        isDeleting: true,
        error: false
      };

    case "DELETE_EMPLOYEE_SUCCESS":
      // Remove deleted entry from employee list
      const empsAfterDelete = state.employees.filter((emp) =>
        (emp.empId !== action.payload));
      return {
        ...state,
        isDeleting: false,
        selectedEmployee: -1,
        employee: null,
        employees: empsAfterDelete
      };

    case "ADD_EMPLOYEE":
      // user wants to add a new employee. 
      // clear current object in form
      const emptyEmp = { empId: 0, lastname: "", firstname: "", deptId: 0 };
      // console.log("in ADD_EMPLOYEE");
      return {
        ...state,
        isAdding: true,
        employee: emptyEmp,
        error: false
      };

    case "ADD_EMPLOYEE_CANCEL":
      // user cancels add operation before submit
      // console.log("in ADD_EMPLOYEE_CANCEL");
      let empSelected = state.employees.find(e => e.empId === action.payload)
      if (!empSelected) {
        if (state.employees.length > 0)
          empSelected = state.employees[0];
        else
          empSelected = { empId: 0, lastname: "", firstname: "", deptId: 0 };
      }
      return {
        ...state,
        isAdding: false,
        selectedEmployee: empSelected.empId,
        employee: empSelected,
        error: false
      };

    case "ADD_EMPLOYEE_SUBMIT":
      // user submitted new employee
      // cast employee id and deptId to integer value
      const emp = {
        ...action.payload,
        empId: parseInt(action.payload.empId),
        deptId: parseInt(action.payload.deptId)
      };
      // console.log("in ADD_EMPLOYEE_SUBMIT");
      return {
        ...state,
        isAddSubmit: true,
        employee: emp,
        selectedEmployee: emp.empId,
        error: false
      };

    case "ADD_EMPLOYEE_SUCCESS":
      // after successful POST request: add the current employee to the
      // employee list, set it as the current employee and end activity
      return {
        ...state,
        isAdding: false,
        isAddSubmit: false,
        selectedEmployee: action.payload.empId,
        employee: action.payload,
        employees: [...state.employees, action.payload].sort((a, b) => a.empId - b.empId)
      };

    case "EMPLOYEES_ERROR":
      return {
        ...state,
        isLoading: false,
        isUpdating: false,
        isDeleting: false,
        isAddSubmit: false,
        error: action.payload
      };

    default:
      return state;
  }
}
