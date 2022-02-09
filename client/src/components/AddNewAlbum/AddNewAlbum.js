import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import myApi from "../../API/Api";

import "./AddNewAlbum.css";

export default function AddNewAlbum() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [privateAlbum, setPrivateAlbum] = useState(false);
  // const [albumOwner,setAlbumOwner]= useState("");
  const tokenString = localStorage.getItem("token");
  const token = JSON.parse(tokenString);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName(name);
    setDescription(description);
    setPrivateAlbum(privateAlbum);

    const newAlbum = { name, description, privateAlbum };

    // setIsLoading(true);
    try {
      const auth = `Bearer ${token}`;
      const res = await myApi.post("/albums/newalbum", newAlbum, {
        headers: { Authorization: auth },
      });
      console.log(res.data.newAlbum._id);

      history.push(`/showalbum/${res.data.newAlbum._id}`);
    } catch (error) {
      // setIsLoading(false);
      // setShowmsg(error.response.data.error);
      console.log(error.response);
    }
  };

  const handleCancel = () => {
    history.push("/albumslist");
  };

  return (
    <div className="addnewalbum-wrap">
      <form action="" className="addnewalbum-form">
        <div className="addnewalbum-header">Create new album</div>
        <input
          className="addnewalbum-form--input"
          type="text"
          name="name"
          placeholder="Album name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <textarea
          className="addnewalbum-form--input input-description"
          name="description"
          cols="30"
          rows="3"
          placeholder="Album description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="addnewalbum-form--checkbox-wrap">
          <input
            className="addnewalbum-form--checkbox"
            type="checkbox"
            name="private"
            checked={privateAlbum}
            onChange={(e) => setPrivateAlbum(e.target.checked)}
          />
          <label htmlFor="private">Private Album</label>
        </div>
        <button className="submit-user-btn" onClick={handleSubmit}>
          Add Album
        </button>
        <button className="submit-user-btn" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
