import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header>
        <Link to="/">
          <ul>HomePage</ul>
        </Link>
        <Link to="/signup">
          <ul>signup</ul>
        </Link>
      </header>
    </div>
  );
}
