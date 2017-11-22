import React from "react";

export default ({ currentUser, logout }) => {
  if (currentUser) {
    return (<button onClick={logout}>Logout</button>);
  } else {
    return "";
  }
}
