import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlbumCard from "../AlbumCard/AlbumCard";
import myApi from "../../API/Api";
import "./AlbumsList.css";

export default function AlbumsList() {
  const [albumsList, setAlbumsList] = useState([]);

  const tokenString = localStorage.getItem("token");
  const token = JSON.parse(tokenString);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const auth = `Bearer ${token}`;
        const { data } = await myApi.get("/albums", {
          headers: { Authorization: auth },
        });
        console.log(data);
        setAlbumsList(data);
      } catch (error) {
        console.log(error);
        setAlbumsList([]);
      }
    };
    getUsers();
    return () => {};
  }, []);

  const displayAlbumCards = () => {
    return albumsList
      ? albumsList.map((item) => {
          return <AlbumCard key={item._id} item={item} />;
        })
      : [];
  };

  return (
    <div className="albums-list-wrap">
      <div className="albums-list-top">
        <div className="albums-list-searchbar">
          <input type="text" />
          <button>search</button>
        </div>
        <Link className="addalbum-link" to="/albums/addalbum">
          Create new album
        </Link>
      </div>
      <div className="albums-list">{displayAlbumCards()}</div>
    </div>
  );
}
