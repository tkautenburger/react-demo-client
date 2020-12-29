export default function reducer(state, action) {
  switch (action.type) {

    case "SET_EMPLOYEE":
      return {
        ...state,
        selectedEmployee: action.payload.empId,
        employee: action.payload.empl,
        isUpdating: false
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

    case "EMPLOYEES_ERROR":
      return {
        ...state,
        isLoading: false,
        isUpdating: false,
        isDeleting: false,
        error: action.payload
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

    default:
      return state;
  }
}
