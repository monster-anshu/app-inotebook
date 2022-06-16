/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Context } from "../context/NoteState";
import { alertContext } from "../context/AlertContext";
export default function Noteitem(props) {
  const { note, update } = props;
  const { deleteNote } = useContext(Context);
  const { showAlert, setLoading } = useContext(alertContext);
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title"> {note.title} </h5>
          <p className="card-text"> {note.description}</p>
          <i
            className="far fa-trash-alt mx-2"
            onClick={async () => {
              setLoading(true);
              await deleteNote(note._id);
              showAlert("success", "Note Deleted !");
              setLoading(false);
            }}
          ></i>
          <i
            className="fas fa-edit mx-2"
            onClick={async () => {
              props.sethandle("Update");
              await update(note);
            }}
            data-bs-toggle="modal"
            data-bs-target="#editNote"
          ></i>
        </div>
      </div>
    </>
  );
}
