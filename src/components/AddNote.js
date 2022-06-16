/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/NoteState";
import { alertContext } from "../context/AlertContext";
import Btn from "./Btn";
export default function AddNote(props) {
  const { showAlert, setLoading } = useContext(alertContext);
  const { addNote, editNote } = useContext(Context);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const UpdateNote = async (event) => {
    setLoading(true);
    if (note.description.length < 5 || note.title < 5) {
      showAlert("danger", "Note is Too short");
      setLoading(false);
      return;
    }
    event.preventDefault();
    await editNote(note);
    setNote({ title: "", description: "", tag: "" });
    showAlert("success", "note updated !");
    setLoading(false);
  };

  const Addnote = async (event) => {
    setLoading(true);
    if (note.description.length < 5 || note.title < 5) {
      showAlert("danger", "Note is Too short");
      setLoading(false);
      return;
    }
    event.preventDefault();
    await addNote(note);
    showAlert("success", "Note added !");
    setNote({ title: "", description: "", tag: "" });
    setLoading(false);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const Button = () => {
    if (props.handle === "Add") {
      return <Btn action={Addnote} work={"Add"} />;
    }

    return <Btn action={UpdateNote} work={"Update"} />;
  };

  useEffect(() => {
    if (props.note._id) {
      setNote(props.note);
      return;
    }
    setNote({ title: "", description: "", tag: "" });
  }, [props.note]);

  return (
    <div>
      <h1>{props.handle}</h1>
      <form className="my-3">
        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            Title{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            className="form-control"
            onChange={onChange}
            name="description"
            value={note.description}
            rows={8}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="tag">
            Tag
          </label>
          <input
            id="tag"
            className="form-control"
            onChange={onChange}
            name="tag"
            value={note.tag}
          />
        </div>
        <Button></Button>
      </form>
    </div>
  );
}
