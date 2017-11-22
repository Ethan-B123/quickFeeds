import React from "react";
import { Link } from "react-router-dom";

export default ({}) => (
  <nav className="splash-nav">
    <div className="nav-center">
      <div className="nav-icon-container">
        <img className="nav-icon-img" src="https://lh3.googleusercontent.com/oKsgcsHtHu_nIkpNd-mNCAyzUD8xo68laRPOfvFuO0hqv6nDXVNNjEMmoiv9tIDgTj8=w170" alt="quickFeeds logo" />
      </div>
      <div className="nav-link-container">
        <Link className="nav-link" to="/login">LOGIN</Link>
        <Link className="nav-link" to="/signup">Get started for free</Link>
      </div>
    </div>
  </nav>
);
