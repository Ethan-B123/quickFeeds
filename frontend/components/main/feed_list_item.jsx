import React from "react";
import { Link } from "react-router-dom";

export default ({ feed }) => {

  return (
    <li>
      <Link className="feed" to={"/feed/" + feed.id}>
        {feed.title}
      </Link>
    </li>
  )
}
