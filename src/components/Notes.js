import React, { useContext, useState } from "react";
import { Context } from "../context/NoteState";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

export default function Notes(props) {
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [handle, sethandle] = useState("Add");
  const { notes } = useContext(Context);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary my-3"
        data-bs-toggle="modal"
        data-bs-target="#editNote"
        onClick={() => {
          sethandle("Add");
          setNote({ title: "", description: "", tag: "" });
        }}
      >
        + Add Note
      </button>

      <div className="grid-container">
        {notes.map((ele) => {
          return (
            <Noteitem
              note={ele}
              key={notes.indexOf(ele)}
              index={notes.indexOf(ele)}
              update={setNote}
              sethandle={sethandle}
            />
          );
        })}
      </div>

      <div
        className="modal fade"
        id="editNote"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <AddNote handle={handle} note={note} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
