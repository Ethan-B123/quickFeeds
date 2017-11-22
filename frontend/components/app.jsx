import React from 'react';
import { Route } from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import SessionForm from "./auth/session_form_container";
import SignupForm from "./auth/signup_form_container";

const App = () => (
  <div>
    <AuthRoute path="/signup" component={SignupForm} />
    <AuthRoute path="/login" component={SessionForm} />
  </div>
);

export default App;
