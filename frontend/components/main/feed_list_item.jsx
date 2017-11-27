import React from "react";
import { Link } from "react-router-dom";

export default ({ feed }) => {

  return (
    <li key={feed.id}>
      <Link to={"/feed/" + feed.id}>
        {feed.title}
      </Link>
    </li>
  )
}
