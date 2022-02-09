import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Header() {
  const token = localStorage.getItem("token");
  const userToken = JSON.parse(token);

  return (
    <nav className="navbar">
      <div className="navbar--left">
        <Link to="/">HomePage</Link>
        <Link to="/signup">signup</Link>
        <Link to="/signin">signin</Link>
      </div>
      <div className="navbar--right">
        <Link to="/signout">signout</Link>
      </div>
    </nav>
  );
}
