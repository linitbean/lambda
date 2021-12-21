import React from "react";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import PreLoader from "../components/atoms/PreLoader";
import DemoAccount from "../components/pages/authentication/DemoAccount";
import ForgotPassword from "../components/pages/authentication/ForgotPassword";
import Login from "../components/pages/authentication/Login";
import Referral from "../components/pages/authentication/Referral";
import Register from "../components/pages/authentication/Register";
import ResetPassword from "../components/pages/authentication/ResetPassword";
import { useProfile } from "../hooks/useProfile";

const AuthChecker = ({ children }) => {
  const location = useLocation();
  const { profile, loading } = useProfile();

  if (loading) return <PreLoader />;

  const whitelist = ["/account/demo"];
  const path = location.pathname.split("/").slice(0, 3).join("/");
  const whitelisted = whitelist.includes(path);

  console.log();

  if (profile && !whitelisted) return <Redirect to="/dashboard" />;

  return children;
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
        <Route exact path={`${path}/demo`}>
          <DemoAccount />
        </Route>

        <Route>
          <Redirect to={`${url}/login`} />
        </Route>
      </Switch>
    </AuthChecker>
  );
}
