import React from "react";
import { Link } from "react-router-dom";
import SplashNav from "./splash_nav_container";

export default ({}) => (
  <section className="splash-body">
  <SplashNav />
    <div className="splash-center">

      <h1>Welcome to quickFeeds</h1>
      <sub>The content you need to accelerate your<br />research, marketing, and sales</sub>
      <Link className="nav-link" to="/signup">Get started for free</Link>
      <img className="splash-body-img shadow" src="https://s3.feedly.com/production/head/images/landing/screenshot-web@2x.png" />
    </div>
  </section>
);
