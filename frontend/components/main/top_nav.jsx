import React from "react";

export default ({logout, currentUser}) => {

  return (
    <nav className="top-nav">
      <button onClick={logout}>Logout</button>
    </nav>
  );
};
