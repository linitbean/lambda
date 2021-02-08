import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { SWRConfig } from "swr";

import PreLoader from "./components/atoms/PreLoader";

import GlobalStyles from "./themes/global";

import { ThemeProvider } from "./contexts/ThemeContext";

import ScrollToTop from "./utils/ScrollToTop";
import SWROptions from "./utils/swr";

// import AuthRoute from "./routes/AuthRoute";
// import DashboardRoute from "./routes/DashboardRoute";
// import RestrictionRoute from "./routes/RestrictionRoute";

const AuthRoute = lazy(() => import("./routes/AuthRoute"));
const DashboardRoute = lazy(() => import("./routes/DashboardRoute"));
const RestrictionRoute = lazy(() => import("./routes/RestrictionRoute"));

export default function App() {
  return (
    <ThemeProvider>
      <SWRConfig value={SWROptions}>
        <Router>
          <ScrollToTop />
          <GlobalStyles />
          <Suspense fallback={<PreLoader />}>
            <Switch>
              <Route path="/dashboard">
                <DashboardRoute />
              </Route>
              <Route path="/account">
                <AuthRoute />
              </Route>
              <Route path="/confirmation">
                <RestrictionRoute />
              </Route>
              <Route>
                <Redirect to="/dashboard" />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </SWRConfig>
    </ThemeProvider>
  );
}
