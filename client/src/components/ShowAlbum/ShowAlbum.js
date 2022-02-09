import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import myApi from "../../API/Api";
import UploadFiles from "../UploadFiles/UploadFiles";
import Spinner from "../Utils/Spinner/Spinner";

import "./showalbum.css";

export default function ShowAlbum(props) {
  const [albumImages, setAlbumImages] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  console.log(params);

  const imageRef = useRef(null);

  const albumID = params.id;
  useEffect(() => {
    const loadAlbumImages = async () => {
      setIsLoading(true);
      try {
        const response = await myApi.get(`/albums/${albumID}`);
        setAlbumImages(response.data.images);
        setAlbumName(response.data.name);
        setAlbumDescription(response.data.description);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    loadAlbumImages();
  }, []);

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
                },
              }}
              className="image"
            >
              <img
                ref={imageRef}
                src={image}
                alt="image1"
                className="album-img w-1"
              />
            </Link>
          </div>
        );
      })
    );
  };

  return (
    <div className="showalbum-wrap">
      <h2 className="name">{albumName}</h2>
      <p className="description">{albumDescription}</p>
      <UploadFiles
        id={albumID}
        setAlbumImages={setAlbumImages}
        albumImages={albumImages}
      />
      {isLoading && <Spinner />}
      <div className="grid-container">
        <div className="showalbum-grid">{showImages()}</div>
      </div>
    </div>
  );
}
