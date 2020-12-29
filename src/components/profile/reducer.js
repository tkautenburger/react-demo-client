export default function reducer(state, action) {
  switch (action.type) {

    case "GET_USER":
      return {
        ...state,
        family_name: action.payload.profile.family_name,
        given_name: action.payload.profile.given_name,
        email: action.payload.profile.email,
        preferred_username: action.payload.profile.preferred_username,
        sub: action.payload.profile.sub,
        access_token: action.payload.access_token,
        id_token: action.payload.id_token,
        session_state: action.payload.session_state
      };

    default:
      return state;
  }
}
