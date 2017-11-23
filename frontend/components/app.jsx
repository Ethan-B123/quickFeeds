import React from 'react';
import { Route } from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import SessionForm from "./auth/session_form_container";
import SignupForm from "./auth/signup_form_container";
import SplashPage from "./splash/splash_page";
import SplashNav from "./splash/splash_nav_container";

// import { CSSTransitionGroup } from "react-transition-group"

const App = () => (
  <div>
    <SplashNav />
    <Route exact path="/" component={SplashPage} />
    <AuthRoute path="/signup" component={SignupForm} />
    <AuthRoute path="/login" component={SessionForm} />
  </div>
);

export default App;

// <CSSTransitionGroup
// transitionName="test"
// transitionEnterTimeout={500}
// transitionLeaveTimeout={300}>
// {[
// ]}
// </CSSTransitionGroup>
