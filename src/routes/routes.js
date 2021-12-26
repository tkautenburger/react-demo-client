import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { Callback } from "../components/auth/callback";
import { Logout } from "../components/auth/logout";
import { LogoutCallback } from "../components/auth/logoutCallback";
import { PrivateRoute } from "./privateRoute";
import { SilentRenew } from "../components/auth/silentRenew";

import { EmployeePage } from "../components/employee/EmployeePage";
import { DepartmentPage } from "../components/department/DepartmentPage";
import { ProfilePage } from "../components/profile/ProfilePage";
import { Menu } from "../components/menu";
import { IDENTITY_CONFIG } from "../utils/authConst";

// import {PublicPage} from "../components/publicPage"

export const Routes = (
  <Switch>

    <Route exact={true} path="/signin-oidc" component={Callback} />
    <Route exact={true} path="/logout" component={Logout} />
    <Route exact={true} path="/logout/callback" component={LogoutCallback} />
    <Route exact={true} path="/silentrenew" component={SilentRenew} />

    <PrivateRoute path="/departments" component={DepartmentPage} />
    <PrivateRoute path="/employees" component={EmployeePage} />
    <PrivateRoute path="/profile" component={ProfilePage} />

    <Route path='/account' component={() => {
      const url = IDENTITY_CONFIG.authority + '/account?referrer=' + 
                  IDENTITY_CONFIG.client_id + '&referrer_uri=' + 
                  encodeURIComponent(IDENTITY_CONFIG.referrerURI);
      window.location.href = url;
      return null;
    }} />

    <Route path="/" component={Menu} />

  </Switch>
);