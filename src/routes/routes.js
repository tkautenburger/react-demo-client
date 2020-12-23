import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { Callback } from "../components/auth/callback";
import { Logout } from "../components/auth/logout";
import { LogoutCallback } from "../components/auth/logoutCallback";
import { PrivateRoute } from "./privateRoute";
import { SilentRenew } from "../components/auth/silentRenew";

import { EmployeePage } from "../components/employee/EmployeePage";
import { DepartmentPage } from "../components/department/DepartmentPage";
import { Menu } from "../components/menu";

// import {PublicPage} from "../components/publicPage"

export const Routes = (
  <Switch>

    <Route exact={true} path="/signin-oidc" component={Callback} />
    <Route exact={true} path="/logout" component={Logout} />
    <Route exact={true} path="/logout/callback" component={LogoutCallback} />
    <Route exact={true} path="/silentrenew" component={SilentRenew} />

    <PrivateRoute path="/departments" component={DepartmentPage} />
    <PrivateRoute path="/employees" component={EmployeePage} />

    <Route path="/" component={Menu} />

  </Switch>
);