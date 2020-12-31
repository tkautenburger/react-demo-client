export default function reducer(state, action) {
  switch (action.type) {

    case "SET_DEPARTMENT":
      // set the selected department and the department with the newly
      // selected object from the table / list
      return {
        ...state,
        selectedDepartment: action.payload.deptId,
        department: action.payload.dept,
        isUpdating: false,
        isAdding: false,
        isDeleting: false,
        error: false
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
        departments: action.payload.sort((a, b) => a.deptId - b.deptId)
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

    case "DELETE_DEPARTMENT":
      return {
        ...state,
        isDeleting: true,
        error: false
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

    case "ADD_DEPARTMENT":
      // user wants to add a new department. 
      // clear current object in form
      const emptyDept = { deptId: 0, name: "", description: "" };
      // console.log("in ADD_DEPARTMENT");
      return {
        ...state,
        isAdding: true,
        department: emptyDept,
        error: false
      };

    case "ADD_DEPARTMENT_CANCEL":
      // user cancels add operation before submit
      // console.log("in ADD_DEPARTMENT_CANCEL");
      let deptSelected = state.departments.find(e => e.deptId === action.payload)
      if (!deptSelected)
        deptSelected = state.departments[0];
      return {
        ...state,
        isAdding: false,
        selectedDepartment: deptSelected.deptId,
        department: deptSelected,
        error: false
      };

    case "ADD_DEPARTMENT_SUBMIT":
      // user submitted new department
      // cast department id to integer value
      const dept = { ...action.payload, deptId: parseInt(action.payload.deptId) };
      // console.log("in ADD_DEPARTMENT_SUBMIT");
      return {
        ...state,
        isAddSubmit: true,
        department: dept,
        selectedDepartment: dept.deptId,
        error: false
      };

    case "ADD_DEPARTMENT_SUCCESS":
      // after successful POST request: add the current department to the
      // department list, set it as the current department and end activity
      return {
        ...state,
        isAdding: false,
        isAddSubmit: false,
        selectedDepartment: action.payload.deptId,
        department: action.payload,
        departments: [...state.departments, action.payload].sort((a, b) => a.deptId - b.deptId)
      };

    case "DEPARTMENTS_ERROR":
      // end all current activities and set the error message
      // in the state
      return {
        ...state,
        isLoading: false,
        isUpdating: false,
        isDeleting: false,
        isAdding: false,
        isAddSubmit: false,
        error: action.payload
      };

    default:
      return state;
  }
}
