import React from "react";
import LogoutButton from "../auth/logout_button_container";
import { Link } from "react-router-dom";

export default ({ clearErrors }) => (
  <nav className="splash-nav">
    <div className="nav-center">
      <div className="nav-icon-container">
        <Link to="/">
          <img className="nav-icon-img" src="https://lh3.googleusercontent.com/oKsgcsHtHu_nIkpNd-mNCAyzUD8xo68laRPOfvFuO0hqv6nDXVNNjEMmoiv9tIDgTj8=w170" alt="quickFeeds logo" />
        </Link>
      </div>
      <div className="nav-link-container">
        <LogoutButton />
        <Link
          onClick={clearErrors}
          className="nav-link"
          to="/login">login</Link>
        <Link
          onClick={clearErrors}
          className="nav-link"
          to="/signup">sign up</Link>
      </div>
    </div>
  </nav>
);
