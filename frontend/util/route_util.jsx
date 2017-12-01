import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllFeeds } from "../actions/feed_actions";

const Auth = ({component: Component, path, loggedIn, feeds, fetchAllFeeds}) => {
  if (Object.keys(feeds).length === 0) {
    fetchAllFeeds();
    return (
      <div></div>
    )
  }
  const firstFeed = feeds[Object.keys(feeds)[0]];
  return (
    <Route path={path} render={(props) => (
      !loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={"/feed/" + firstFeed.id} />
      )
    )}/>
  )
};

const Protected = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={(props) => (
     loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  )} />
);

const mapDispatchToProps = dispatch => ({
  fetchAllFeeds: () => dispatch(fetchAllFeeds())
});

const mapStateToProps = state => (
  {
    loggedIn: Boolean(state.session.currentUser),
    feeds: state.feeds
  }
);

export const AuthRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
