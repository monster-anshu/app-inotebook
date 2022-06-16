import React from "react";

export default function Btn(props) {
  return (
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Close
      </button>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#editNote"
        onClick={props.action}
      >
        {props.work}
      </button>
    </div>
  );
}
