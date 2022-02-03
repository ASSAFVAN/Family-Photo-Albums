import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import myApi from "../../API/Api";
import Spinner from "../Utils/Spinner/Spinner";
import "./signin.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = { email, password };
    setIsLoading(true);
    try {
      const res = await myApi.post("/users/signin", currentUser);
      console.log(res.data);
      setEmail("");
      setPasword("");
      setIsLoading(false);
      history.push("/albumslist");
    } catch (error) {
      console.log(error.response.message);
    }
  };

  return (
    <div className="wrap">
      <div className="signin-container">
        <form className="signin-form">
          <input
            className="signin-form--input"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="signin-form--input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
          />
          <button
            className="submit-user-btn"
            type="submit"
            disabled={password.length < 7 || !email}
            onClick={handleSubmit}
          >
            Sign in
          </button>
        </form>
        {isLoading && <Spinner />}
      </div>
    </div>
  );
}
