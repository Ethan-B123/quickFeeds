import React from "react";
import configureStore from "./store/store";
import Root from "./components/root"
import ReactDOM from "react-dom";


import * as APIUtil from "./util/APIUtil"
import {
  signup,
  login,
  logout
} from "./actions/session_actions";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');

  let preloadedState = {};
  if (window.currentUser) {
    preloadedState = { session: { currentUser: window.currentUser } };
    delete window.currentUser;
  }
  const store = configureStore(preloadedState);

  window.APIUtil = APIUtil;
  window.signup = signup;
  window.login = login;
  window.logout = logout;
  window.dispatch = store.dispatch;
  window.store = store;
  ReactDOM.render(<Root store={store} />, root);
});
