import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import myApi from "../../API/Api";
import "./style.css";

export default function Header(props) {
  const userString = localStorage.getItem("loggedUser");
  const userObj = JSON.parse(userString);
  const history = useHistory();

  const handleLogOut = async () => {
    const token = localStorage.getItem("token");
    const userToken = JSON.parse(token);
    try {
      const response = await myApi.post(
        `users/signout`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      localStorage.clear();
      props.setToken(null);
      // setIsLogged(false);
      history.push("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar--left">
        <Link to="/">HomePage</Link>
        {userObj?.name && <Link to="/albumslist">Albums</Link>}
        {userObj?.name && <Link to="/favorites">Favorites</Link>}
      </div>
      {userObj?.name && (
        <div className="navbar--right">
          <div className="navbar-username">{`Hello, ${userObj.name}`}</div>
          <div className="navbar-signout" onClick={handleLogOut}>
            Signout
          </div>
        </div>
      )}
    </nav>
  );
}
