import React, { useState } from "react";
import myApi from "../../API/Api";
import "./uploadfiles.css";

export default function UploadFiles(props) {
  const [filesData, setFilesData] = useState([]);

  const fileChangeHandler = (e) => {
    const allSelectedFiles = e.target.files;
    setFilesData(Object.values(allSelectedFiles));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const albumID = props.id;
    try {
      const data = new FormData();
      filesData.forEach((file) => {
        data.append("images", file);
      });
      const response = await myApi.post(`/albums/${albumID}`, data);
      props.setAlbumImages(response.data.images);
      console.log(response, "response");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="uploadfile-container">
      <form onSubmit={onSubmitHandler}>
        <input
          type="file"
          id="file"
          onChange={fileChangeHandler}
          multiple
          className="uploadfile-input"
          placeholder="Upload Image"
        />
        <div className="uploadfile-btn-wrap">
          <button
            disabled={filesData.length < 1}
            type="submit"
            className="uploadfile-btn upload"
          >
            Upload <i className="fas fa-file-upload upload"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
