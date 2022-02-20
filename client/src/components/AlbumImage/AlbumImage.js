import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ConfirmDeleteImage from "../ConfirmDeleteImage/ConfirmDeleteImage";
import Spinner from "../Utils/Spinner/Spinner";
import myApi from "../../API/Api";
import "./albumimage.css";

export default function AlbumImage(props) {
  const tokenString = localStorage.getItem("token");
  const userString = localStorage.getItem("loggedUser");
  const token = JSON.parse(tokenString);
  const userObj = JSON.parse(userString);
  const auth = `Bearer ${token}`;

  const history = useHistory();

  const [albumImage, setAlbumImage] = useState(null);
  const [isAlbumOwner, setIsAlbumOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const albumID = props.location.state.albumID;
  const imageID = props.location.state.imageID;

  useEffect(() => {
    const loadAlbumImages = async () => {
      setIsLoading(true);
      try {
        const response = await myApi.get(`/albums/${albumID}`, {
          headers: { Authorization: auth },
        });
        console.log(response.data);
        setAlbumImage(response.data.images[imageID]);
        if (response.data.owner === userObj?._id) {
          setIsAlbumOwner(true);
        }
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    loadAlbumImages();
  }, []);

  const handleAddToFavorites = async () => {
    const auth = `Bearer ${token}`;
    const imageName = props.location.state.imageName;
    const response = await myApi.post(
      `/users/favorites/${userObj?._id}`,
      { imageName: imageName },
      {
        headers: { Authorization: auth },
      }
    );
    history.push("/favorites");
  };

  const handleDelete = async () => {
    const itemToDelte = props.location.state.imageID;
    const response = await myApi.delete(`/albums/${albumID}/${imageID}`, {
      headers: { Authorization: auth },
    });
    console.log(itemToDelte, response);
    setAlbumImage(null);
    history.push(`/showalbum/${albumID}`);
  };

  return (
    <div className="showimage-wrap">
      <img src={albumImage} alt="" className="showimage-img" />
      <div className="showimage-actions">
        <i className="fas fa-heart" onClick={handleAddToFavorites}></i>
        <ConfirmDeleteImage handleDelete={handleDelete} owner={isAlbumOwner} />
      </div>
      {isLoading && <Spinner />}
    </div>
  );
}
