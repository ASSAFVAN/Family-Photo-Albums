import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";

export default function Homepage() {
  const userString = localStorage.getItem("loggedUser");
  const userObj = JSON.parse(userString);
  return (
    <div className="homepage-container">
      <div className="homepage-images-container">
        <img
          src="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="image-1 hp-image"
        />

        <img
          src="https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="image-2 hp-image"
        />

        <img
          src="https://images.unsplash.com/photo-1549227082-0ea18ce30397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="image-3 hp-image"
        />

        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="image-4 hp-image"
        />

        <img
          src="https://images.unsplash.com/photo-1617464629340-d727a73d4f69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="image-5 hp-image"
        />

        <img
          src="https://images.unsplash.com/photo-1542037179399-bbf09c7f9888?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          alt=""
          className="image-6 hp-image"
        />

        <img
          src="https://images.unsplash.com/photo-1567067974934-75a3e4534c14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="image-7 hp-image"
        />

        <img
          src="https://images.unsplash.com/photo-1509924603848-aca5e5f276d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="image-8 hp-image"
        />

        <img
          src="https://images.unsplash.com/photo-1517488629431-6427e0ee1e5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="image-9 hp-image"
        />

        <img
          src="https://images.unsplash.com/photo-1527490087278-9c75be0b8052?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80"
          alt=""
          className="image-10 hp-image"
        />
      </div>
      <div className="homepage-statement">
        Share your memories by creating photo albums
      </div>
      {!userObj?.name && (
        <Link to="/signin" className="signin-user-btn">
          Sign in
        </Link>
      )}
    </div>
  );
}
