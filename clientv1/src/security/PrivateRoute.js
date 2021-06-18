import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoute(props) {
  const loggedIn = useAuth().isLogin;
  return loggedIn ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
