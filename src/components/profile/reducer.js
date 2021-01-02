/*********************************
 * User Profile Domain Reducer
 *********************************/

export default function reducer(state, action) {
  switch (action.type) {

    case "GET_USER":
      return {
        ...state,
        family_name: action.payload.user.profile.family_name,
        given_name: action.payload.user.profile.given_name,
        email: action.payload.user.profile.email,
        preferred_username: action.payload.user.profile.preferred_username,
        sub: action.payload.user.profile.sub,
        access_token: action.payload.user.access_token,
        id_token: action.payload.user.id_token,
        session_state: action.payload.user.session_state,
        roles: action.payload.accessToken.realm_access.roles
      };

    default:
      return state;
  }
}
