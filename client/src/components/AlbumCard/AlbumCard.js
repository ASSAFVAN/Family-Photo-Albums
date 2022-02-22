import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myApi from "../../API/Api";
import ConfirmDeleteAlbum from "../ConfirmDeleteAlbum/ConfirmDeleteAlbum";
import "./albumcard.css";

function AlbumCard({ item: { _id, name, description, owner }, handleRender }) {
  const tokenString = localStorage.getItem("token");
  const userString = localStorage.getItem("loggedUser");
  const token = JSON.parse(tokenString);
  const userObj = JSON.parse(userString);
  const auth = `Bearer ${token}`;

  const [lastImage, setLastImage] = useState("");
  const [isAlbumOwner, setIsAlbumOwner] = useState(false);

  useEffect(() => {
    const getLastImage = async () => {
      try {
        const response = await myApi.get(`/albums/${_id}`);
        setLastImage(response.data.images[response.data.images.length - 1]);
        if (response.data.owner === userObj?._id) {
          setIsAlbumOwner(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLastImage();
  }, []);

  const handleAlbumDelete = async () => {
    try {
      const response = await myApi.delete(`/albums/${_id}`, {
        headers: { Authorization: auth },
      });
      handleRender();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <img src={lastImage} alt="lastimage" className="albumcard-image" />
      <div className="card-right">
        <div className="card-right--top">
          <h3 className="card-albumname">{name}</h3>
          <p className="card-description">{description}</p>
        </div>
        <div className="card-right--bottom">
          <Link
            to={{
              pathname: `/showalbum/${_id}`,
            }}
          >
            <button className="view-album-btn">View</button>
          </Link>
          <ConfirmDeleteAlbum
            handleAlbumDelete={handleAlbumDelete}
            owner={isAlbumOwner}
          />
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;
