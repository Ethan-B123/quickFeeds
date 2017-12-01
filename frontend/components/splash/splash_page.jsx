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
      <img className="splash-body-img shadow" src="https://res.cloudinary.com/dhc8w148v/image/upload/v1512151847/Screen_Shot_2017-12-01_at_10.10.00_AM_a96hwu.png" />
    </div>
  </section>
);
