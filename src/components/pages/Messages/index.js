import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

import DashboardLayout from "../../templates/Dashboard";

import Home from "./Home";
import MessageBody from "./MessageBody";

const Messages = () => {
  const { path, url } = useRouteMatch();

  return (
    <DashboardLayout>
      <Switch>
        <Route exact path={`${path}`}>
          <Home />
        </Route>

        <Route path={`${path}/:id`}>
          <MessageBody />
        </Route>

        <Route>
          <Redirect to={`${url}`} />
        </Route>
      </Switch>
    </DashboardLayout>
  );
};

export default Messages;
