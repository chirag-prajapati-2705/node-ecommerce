// Navigation.js
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin" style={{ display: "none" }}>
            Admin
          </Link>
        </li>
        <li>
          <Link to="/" style={{ display: "none" }}>
            Frontend
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
