import React, { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import myApi from "../../API/Api";
import Spinner from "../Utils/Spinner/Spinner";
import "./signup.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [showmsg, setShowmsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setShowmsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, password };
    setIsLoading(true);
    try {
      const res = await myApi.post("/users/signup", newUser);
      setIsLoading(false);
      history.push("/signin");
    } catch (error) {
      setIsLoading(false);
      setShowmsg(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  return (
    <div className="wrap">
      <div className="signup-container">
        <form className="signup-form">
          <h3 className="signup-title">
            Sign up to see photo albums from your family.
          </h3>
          <input
            className="signup-form--input"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={inputRef}
          />
          <input
            className="signup-form--input"
            type="text"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="signup-form--input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
          />
          <button
            className="submit-user-btn"
            type="submit"
            disabled={password.length < 7 || !name || !email}
            onClick={handleSubmit}
          >
            Sign up
          </button>
          {showmsg && (
            <div className="err-email">
              <i className="far fa-times-circle"></i>
              {showmsg}
            </div>
          )}
          {isLoading && <Spinner />}
        </form>
        <Link to="/signin" className="signup-linkto-signin">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
