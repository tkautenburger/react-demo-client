export default function reducer (state, action) {
  switch (action.type) {

    case "SET_DEPARTMENT":
      return {
        ...state,
        selectedDepartment: action.payload
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

    default:
      return state;
  }
}
