import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ConfirmDeleteImage from "../ConfirmDeleteImage/ConfirmDeleteImage";
import myApi from "../../API/Api";
import "./albumimage.css";

export default function AlbumImage(props) {
  const tokenString = localStorage.getItem("token");
  const token = JSON.parse(tokenString);
  const history = useHistory();

  const [albumImage, setAlbumImage] = useState(null);

  const albumID = props.location.state.albumID;
  const imageID = props.location.state.imageID;
  console.log("imageid", imageID);

  useEffect(() => {
    const loadAlbumImages = async () => {
      // setIsLoading(true);
      try {
        const auth = `Bearer ${token}`;
        const response = await myApi.get(`/albums/${albumID}`, {
          headers: { Authorization: auth },
        });
        console.log(response.data);
        setAlbumImage(response.data.images[imageID]);
        console.log(albumImage);
      } catch (error) {
        console.log(error.message);
      }
      // setIsLoading(false);
    };
    loadAlbumImages();
  }, []);

  const handleDelete = async () => {
    const auth = `Bearer ${token}`;
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
      <ConfirmDeleteImage handleDelete={handleDelete} />
    </div>
  );
}
