import React, { useEffect, useState } from "react";
import myApi from "../../API/Api";
import Spinner from "../Utils/Spinner/Spinner";

import "./favorites.css";

export default function Favorites(props) {
  const userString = localStorage.getItem("loggedUser");
  const userObj = JSON.parse(userString);
  const tokenString = localStorage.getItem("token");
  const token = JSON.parse(tokenString);
  const auth = `Bearer ${token}`;

  const [favoritesImages, setFavoritesImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFavoritesImages = async () => {
      setIsLoading(true);
      try {
        const response = await myApi.get(`/users/favorites/${userObj?._id}`, {
          headers: { Authorization: auth },
        });
        setFavoritesImages(response.data.favorites);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    loadFavoritesImages();
  }, []);

  const showImages = () => {
    return (
      favoritesImages &&
      favoritesImages.map((image, index) => {
        return (
          <div key={index}>
            <img src={image} alt="image1" className="favorites-img" />
            <i
              className="far fa-trash-alt"
              onClick={() => handleDelete(index)}
            ></i>
          </div>
        );
      })
    );
  };

  const handleDelete = async (index) => {
    const response = await myApi.delete(
      `/users/favorites/${userObj?._id}/${index}`,
      {
        headers: { Authorization: auth },
      }
    );
    console.log(response);

    setFavoritesImages(response.data.favorites);
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <div className="favorites-grid-container">
        {!favoritesImages.length > 0 && (
          <div className="favorites-msg">No images added to favorites</div>
        )}
        <div className="favorites-grid">{showImages()}</div>
      </div>
    </div>
  );
}
