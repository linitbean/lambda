import React from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import PreLoader from "../components/atoms/PreLoader";

import Login from "../components/pages/authentication/Login";
import Register from "../components/pages/authentication/Register";
import Referral from "../components/pages/authentication/Referral";
import ForgotPassword from "../components/pages/authentication/ForgotPassword";
import ResetPassword from "../components/pages/authentication/ResetPassword";

import { useProfile } from "../hooks/useProfile";

const AuthChecker = ({ children }) => {
  const { profile, loading } = useProfile();

  if (loading) return <PreLoader />;

  if (profile) return <Redirect to="/dashboard" />;

  if (!profile) return children;
};

export default function AuthRoute() {
  const { path, url } = useRouteMatch();

  return (
    <AuthChecker>
      <Switch>
        <Route exact path={`${path}/login`}>
          <Login />
        </Route>
        <Route exact path={`${path}/register`}>
          <Register />
        </Route>
        <Route exact path={`${path}/referral/:ref`}>
          <Referral />
        </Route>
        <Route exact path={`${path}/forgot-password`}>
          <ForgotPassword />
        </Route>
        <Route exact path={`${path}/reset-password/:token`}>
          <ResetPassword />
        </Route>

        <Route>
          <Redirect to={`${url}/login`} />
        </Route>
      </Switch>
    </AuthChecker>
  );
}
