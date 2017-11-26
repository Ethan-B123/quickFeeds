import React from 'react';
import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SessionForm from "./auth/session_form_container";
import SignupForm from "./auth/signup_form_container";
import SplashPage from "./splash/splash_page";

import ArticleIndex from "./main/article_index_container";

// import { CSSTransitionGroup } from "react-transition-group"

const Test2 = (props) => {
  debugger;
  return (
    <div>
      <h1>wow</h1>
    </div>
  )
};

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={SplashPage} />
      <AuthRoute path="/signup" component={SignupForm} />
      <AuthRoute path="/login" component={SessionForm} />
      <ProtectedRoute path="/:groupType/:groupId" component={ArticleIndex} />
    </Switch>
  </div>
);
// <Route path="/:route/:id" component={Test2} />
// <AuthRoute path="/feed/:feedId" component={ArticleIndex} />

export default App;

// <CSSTransitionGroup
// transitionName="test"
// transitionEnterTimeout={500}
// transitionLeaveTimeout={300}>
// {[
// ]}
// </CSSTransitionGroup>
