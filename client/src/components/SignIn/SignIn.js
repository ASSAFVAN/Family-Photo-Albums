import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import myApi from "../../API/Api";
import Spinner from "../Utils/Spinner/Spinner";

import "./signin.css";

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showmsg, setShowmsg] = useState(null);
  const [loggedUser, setLoggedUser] = useState({});

  const history = useHistory();

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (loggedUser?.name) {
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    }
    const userString = localStorage.getItem("loggedUser");
    if (userString !== JSON.stringify(loggedUser) || !loggedUser.name) {
      const userObj = JSON.parse(userString);
      setLoggedUser(userObj);
    }
  }, [loggedUser]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setShowmsg(null);
  };

  const handlePasswordChange = (e) => {
    setPasword(e.target.value);
    setShowmsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = { email, password };
    setIsLoading(true);
    try {
      const res = await myApi.post("/users/signin", currentUser);
      console.log(res);
      props.setToken(res.data.token);
      const usr = res.data.user;
      console.log("usr", usr);

      setLoggedUser(usr);
      setIsLoading(false);
      window.location.href = "/albumslist";
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setShowmsg(error.response.data.error);
    }
  };

  return (
    <div className="wrap">
      <div className="signin-container">
        <div className="signin-wrap">
          <form className="signin-form">
            <div className="signin-user-logo">
              <i className="fas fa-user"></i>
            </div>
            <input
              className="signin-form--input"
              type="text"
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
              ref={inputRef}
            />
            <input
              className="signin-form--input"
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              className="submit-user-btn"
              type="submit"
              disabled={password.length < 7 || !email}
              onClick={handleSubmit}
            >
              Sign in
            </button>
            {showmsg && (
              <div className="err-email">
                <i className="far fa-times-circle"></i>
                {showmsg}
              </div>
            )}
            {isLoading && <Spinner />}
          </form>
          <div className="signup-linkto-signin">
            <Link to="/signup">Don't have an account? Sign Up!</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
