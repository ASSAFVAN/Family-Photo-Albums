import React from "react";
import { Link, useHistory } from "react-router-dom";
import myApi from "../../API/Api";
import "./style.css";

export default function Header(props) {
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
      history.push("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar--left">
        <Link to="/">HomePage</Link>
        <Link to="/albumslist">Albums</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/signin">Signin</Link>
      </div>
      <div className="navbar--right" onClick={handleLogOut}>
        Signout
      </div>
    </nav>
  );
}
