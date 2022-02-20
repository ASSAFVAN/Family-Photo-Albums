import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./confirmDeleteAlbum.css";

export default function ConfirmDeleteAlbum(props) {
  const submit = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this album?",
      buttons: [
        {
          label: "Yes",
          onClick: () => props.handleAlbumDelete(),
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };
  return (
    <div className="container">
      <button
        className="view-album-btn"
        onClick={submit}
        disabled={!props.owner}
      >
        Delete
      </button>
    </div>
  );
}
