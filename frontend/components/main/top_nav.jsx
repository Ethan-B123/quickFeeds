import React from "react";
import { Link } from 'react-router-dom';

export default ({logout, currentUser}) => {

  return (
    <nav className="top-nav">
      <button onClick={logout}>Logout</button>
      <Link to="/read/0">Saved Articles</Link>
    </nav>
  );
};
