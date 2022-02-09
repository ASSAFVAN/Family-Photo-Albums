import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myApi from "../../API/Api";
import "./albumcard.css";

function AlbumCard({ item: { _id, name, description } }) {
  const [lastImage, setLastImage] = useState("");
  const albumID = _id;
  useEffect(() => {
    const getLastImage = async () => {
      // setIsLoading(true);
      try {
        const response = await myApi.get(`/albums/${albumID}`);
        console.log(response.data.images[response.data.images.length - 1]);
        // setAlbumImages((albumImages) => [...albumImages, response.data.images]);
        setLastImage(response.data.images[response.data.images.length - 1]);
      } catch (error) {
        console.log(error);
      }
      // setIsLoading(false);
    };
    getLastImage();
  }, []);

  return (
    <Link
      to={{
        pathname: `/showalbum/${_id}`,
        // state: {
        //   id: _id,
        // },
      }}
      className="link"
    >
      <div className="card">
        <img src={lastImage} alt="lastimage" className="albumcard-image" />
        <div className="card-right">
          <div className="card-right--top">
            <h3 className="card-albumname">{name}</h3>
            <p className="card-description">{description}</p>
          </div>
          <button className="view-album-btn">View</button>
        </div>
      </div>
    </Link>
  );
}

export default AlbumCard;
