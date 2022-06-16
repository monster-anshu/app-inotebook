import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { alertContext } from "../context/AlertContext";
import Notes from "./Notes";
import { Context } from "../context/NoteState";

export default function Home(props) {
  const navigate = useNavigate();
  const { Logged, User, fetchAllnotes } = useContext(Context);
  const { showAlert, setLoading } = useContext(alertContext);
  const get = async () => {
    setLoading(true);
    if (!(await fetchAllnotes())) {
      showAlert("danger", "something went wrong");
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    if (!Logged) {
      navigate("/login");
      showAlert("danger", "Your need to Login First");
      return;
    }
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Hello {User.name} </h1>
      <Notes />
    </div>
  );
}
