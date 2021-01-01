import React, { useContext, Fragment } from "react"
import ProfileForm from './ProfileFormProps'
import { AuthContext } from "../../providers/authProvider";


// Initial state for the user profile
const initialProps = {
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
  const authContext = useContext(AuthContext);
  let user = {}
  let userProps = initialProps.user;

  if (authContext.isAuthenticated()) {
    user = authContext.getUserData();
    userProps = {
      ...user.profile,
      access_token: user.access_token,
      id_token: user.id_token,
      session_state: user.session_state
    };
    const accessToken = authContext.parseJwt(user.access_token);
    userProps.roles = accessToken.realm_access.roles;
    console.log("Access Token\n" + JSON.stringify(accessToken, null, 2));
  }

  return (
    <Fragment>
      <ProfileForm user={userProps} />
    </Fragment>
  );
}