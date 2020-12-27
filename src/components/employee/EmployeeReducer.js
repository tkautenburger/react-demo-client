export default function reducer (state, action) {
  switch (action.type) {

    case "SET_EMPLOYEE":
      return {
        ...state,
        selectedEmployee: action.payload
      };

    case "FETCH_EMPLOYEES_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: false,
        employees: []
      };

    case "FETCH_EMPLOYEES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        employees: action.payload
      };

    case "FETCH_EMPLOYEES_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
