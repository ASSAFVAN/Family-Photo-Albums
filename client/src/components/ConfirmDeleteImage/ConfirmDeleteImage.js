import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function ConfirmDeleteImage(props) {
  console.log(props);

  const submit = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this image?",
      buttons: [
        {
          label: "Yes",
          onClick: () => props.handleDelete(),
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
      <button onClick={submit}>Delete Image</button>
    </div>
  );
}
