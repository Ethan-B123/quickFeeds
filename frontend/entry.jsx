import React from "react";
import configureStore from "./store/store";
import Root from "./components/root"
import ReactDOM from "react-dom";


import * as APIUtil from "./util/APIUtil"
import * as CollectionApiUtil from "./util/collections_api_util";
import * as FeedApiUtil from "./util/feed_api_util"
import * as SessionActions from "./actions/session_actions"
import * as FeedActions from "./actions/feed_actions"
import * as readActions from "./actions/read_actions"
import * as CollectionActions from "./actions/collection_actions";

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
  if (window.currentUser) {
    preloadedState = { session: { currentUser: window.currentUser } };
    delete window.currentUser;
  }
  const store = configureStore(preloadedState);
  window.fetchFeed = FeedApiUtil.fetchFeed;
  window.fetchAllFeeds = FeedApiUtil.fetchAllFeeds;
  window.createFeed = FeedApiUtil.createFeed;

  // window.SessionActions = SessionActions;
  window.FeedActions = FeedActions;
  window.readActions = readActions;
  window.CollectionActions = CollectionActions;
  window.CollectionApiUtil = CollectionApiUtil;
  // window.signup = signup;
  // window.login = login;
  // window.logout = logout;
  window.dispatch = store.dispatch;
  window.store = store;
  ReactDOM.render(<Root store={store} />, root);
});
