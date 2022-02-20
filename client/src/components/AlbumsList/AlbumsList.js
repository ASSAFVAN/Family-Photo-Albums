import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlbumCard from "../AlbumCard/AlbumCard";
import myApi from "../../API/Api";
import Spinner from "../Utils/Spinner/Spinner";
import "./AlbumsList.css";

export default function AlbumsList() {
  const [albumsList, setAlbumsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tokenString = localStorage.getItem("token");
  const token = JSON.parse(tokenString);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const auth = `Bearer ${token}`;
        const { data } = await myApi.get("/albums", {
          headers: { Authorization: auth },
        });
        console.log(data);
        setAlbumsList(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
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
        <Link className="addalbum-link" to="/albums/addalbum">
          Create new album
        </Link>
        <div>{isLoading && <Spinner />}</div>
      </div>
      <div className="albums-list">{displayAlbumCards()}</div>
    </div>
  );
}
