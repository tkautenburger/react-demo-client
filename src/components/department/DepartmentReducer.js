export default function reducer(state, action) {
  switch (action.type) {

    case "SET_DEPARTMENT":
      // set the selected department and the department with the newly
      // selected object from the table / list
      return {
        ...state,
        selectedDepartment: action.payload.deptId,
        department: action.payload.dept
      };

    case "FETCH_DEPARTMENTS_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: false,
        departments: []
      };

    case "FETCH_DEPARTMENTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        departments: action.payload
      };

    case "FETCH_DEPARTMENTS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case "UPDATE_DEPARTMENT":
      return {
        ...state,
        isUpdating: true,
        error: false,
        department: action.payload
      };

    case "UPDATE_DEPARTMENT_SUCCESS":
      // Update department element in the department list with the actual value 
      // returned from the backend service
      const deptsAfterUpdate = state.departments.map((dept) =>
        (dept.deptId === action.payload.deptId ? action.payload : dept));
      return {
        ...state,
        isUpdating: false,
        department: action.payload,
        departments: deptsAfterUpdate
      };

    case "UPDATE_DEPARTMENT_ERROR":
      return {
        ...state,
        isUpdating: false,
        error: action.payload
      };

    case "DELETE_DEPARTMENT":
      return {
        ...state,
        isDeleting: true,
      };

    case "DELETE_DEPARTMENT_SUCCESS":
      // Remove deleted entry from department list
      const deptsAfterDelete = state.departments.filter((dept) =>
        (dept.deptId !== action.payload));
      return {
        ...state,
        isDeleting: false,
        selectedDepartment: -1,
        department: null,
        departments: deptsAfterDelete
      };

    case "DELETE_DEPARTMENT_ERROR":
      return {
        ...state,
        isDeleting: false,
        error: action.payload
      };

    default:
      return state;
  }
}
