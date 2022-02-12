import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import myApi from "../../API/Api";
import UploadFiles from "../UploadFiles/UploadFiles";
import Spinner from "../Utils/Spinner/Spinner";

import "./showalbum.css";

export default function ShowAlbum(props) {
  const tokenString = localStorage.getItem("token");
  const token = JSON.parse(tokenString);
  const auth = `Bearer ${token}`;

  const [albumImages, setAlbumImages] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumPrivate, setAlbumPrivate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  console.log(params);

  const albumID = params.id;
  useEffect(() => {
    const loadAlbumImages = async () => {
      setIsLoading(true);
      try {
        const response = await myApi.get(`/albums/${albumID}`);
        setAlbumImages(response.data.images);
        setAlbumName(response.data.name);
        setAlbumDescription(response.data.description);
        setAlbumPrivate(response.data.privateAlbum);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    loadAlbumImages();
  }, []);

  const handlePrivateStatus = async () => {
    const privateStatus = await albumPrivate;
    const response = await myApi.put(
      `/albums/${albumID}`,
      {},
      {
        headers: { Authorization: auth },
      }
    );
    setAlbumPrivate(!privateStatus);
  };

  const showImages = () => {
    return (
      albumImages &&
      albumImages.map((image, index) => {
        return (
          <div
            className={`album-item ${index % 10 === 2 ? "grid-1" : ""}${
              index % 10 === 5 ? "grid-2" : ""
            }`}
            key={index}
          >
            <Link
              to={{
                pathname: "/albums/image",
                state: {
                  imageID: index,
                  albumID: albumID,
                  imageName: image,
                },
              }}
              className="image"
            >
              <img src={image} alt="image1" className="album-img" />
            </Link>
          </div>
        );
      })
    );
  };

  return (
    <div className="showalbum-wrap">
      <div className="showalbum-top">
        <div className="showalbum-top-left">
          <h2 className="name">{albumName}</h2>
          <p className="description">{albumDescription}</p>
          <UploadFiles
            id={albumID}
            setAlbumImages={setAlbumImages}
            albumImages={albumImages}
          />
        </div>
        <div className="showalbum-lock" onClick={handlePrivateStatus}>
          {albumPrivate ? (
            <i className="fas fa-lock"></i>
          ) : (
            <i className="fas fa-lock-open"></i>
          )}
        </div>
      </div>
      {isLoading && <Spinner />}
      <div className="grid-container">
        <div className="showalbum-grid">{showImages()}</div>
      </div>
    </div>
  );
}
