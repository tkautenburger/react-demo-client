export default function reducer (state, action) {
  switch (action.type) {

    case "UPDATE_DEPARTMENT":
      return {
        ...state,
        isUpdating: true,
        error: false,
        department: action.payload
      };

    case "UPDATE_DEPARTMENTS_SUCCESS":
      return {
        ...state,
        isUpdating: false,
        department: action.payload
      };

    case "UPDATE_DEPARTMENTS_ERROR":
      return {
        ...state,
        isUpdating: false,
        error: action.payload
      };

    default:
      return state;
  }
}
