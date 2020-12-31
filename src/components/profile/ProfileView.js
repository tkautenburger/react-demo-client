import React, { useReducer, Fragment } from "react"
import ProfileForm from './ProfileForm'

import reducer from "./reducer";

// Initial state for the user profile
const initialState = {
  family_name: "",
  given_name: "",
  email: "",
  preferred_username: "",
  sub: "",
  access_token: "", 
  id_token: "", 
  session_state: "",
  roles: []
}

export default function ProfileView() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Fragment>
      <ProfileForm state={state} dispatch={dispatch} />
    </Fragment>
  );
}