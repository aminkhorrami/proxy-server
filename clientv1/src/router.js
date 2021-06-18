import React from "react";
import { Switch, Route } from "react-router";
import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./components/dashboard";

const Home = () => (
  <div id="app">
    <div class="title">
      <div class="title-inner">
        <div class="cafe">
          <div class="cafe-inner">Proxy Server</div>
        </div>
        <div class="mozart">
          <div class="mozart-inner">Dashboard</div>
        </div>
      </div>
    </div>
    <div class="image">
      <img className="imageDai" alt="" />
    </div>
  </div>
);

const routes = [
  {
    exact: true,
    path: "/",
    component: Home,
  },
  {
    exact: true,
    path: "/dashboard",
    private: true,
    component: Dashboard,
  },
];

export default function Router() {
  return (
    <BrowserRouter history={createBrowserHistory()}>
      <Switch>
        {routes.map(
          (route, index) => (
            // route.private === true ? (
            //   <PrivateRoute key={index} {...route} />
            // ) : (
            <Route key={index} {...route} />
          )
          // )
        )}
      </Switch>
    </BrowserRouter>
  );
}
