// /* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Context = createContext();

const NoteState = (props) => {
  const navigate = useNavigate();
  const host = process.env.REACT_APP_API_KEY || "http://localhost:5000/api";
  const [Logged, setLogged] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [User, setUser] = useState({ name: "", email: "" });
  const intialNote = [];
  const [notes, setNotes] = useState(intialNote);

  const fetchAllnotes = async () => {
    const response = await fetch(`${host}/notes/fetchNotes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
    });
    const res = await response.json();
    if (res.success) {
      setNotes(res.notes);
      return true;
    }
    return false;
  };

  // Add a Note
  const addNote = async (note) => {
    const response = await fetch(`${host}/notes/addNote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
      body: JSON.stringify(note),
    });

    const res = await response.json();
    if (res.success) {
      await fetchAllnotes();
      return true;
    }
    return false;
  };

  // Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
      body: JSON.stringify(notes),
    });
    const res = await response.json();
    if (res.success) {
      await fetchAllnotes();
      return true;
    }
    return false;
  };

  // Edit note
  const editNote = async (note) => {
    if (note._id) {
      const response = await fetch(`${host}/notes/updateNote/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authToken: authToken,
        },
        body: JSON.stringify(note),
      });
      const res = await response.json();
      if (res.success) {
        await fetchAllnotes();
        return true;
      }
    } else if (await addNote(note)) return true;
    else return false;
  };
  // Logout
  const Logout = () => {
    setAuthToken(null);
    setLogged(false);
    setNotes(intialNote);
    localStorage.removeItem("token");
  };

  //Login
  const LoginUsr = async (value) => {
    const response = await fetch(`${host}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const res = await response.json();
    if (res.success) {
      localStorage.setItem("token", res.authToken);
      setAuthToken(res.authToken);
      setLogged(true);
      return true;
    }
    setLogged(false);
    return false;
  };

  // Creating new Account

  const createNewUser = async (user) => {
    const response = await fetch(`${host}/auth/createUser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await response.json();
    if (res.success) {
      await LoginUsr(user);
      return true;
    }
    return false;
  };

  // fetch user info

  const fecthUser = async () => {
    const response = await fetch(`${host}/auth/getUser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
    });
    const res = await response.json();
    if (res.success) {
      setUser({
        name: res.user.name,
        email: res.user.email,
      });
      setLogged(true);
      return true;
    }
    Logout();
    return false;
  };

  useEffect(() => {
    if (authToken === null) {
      setLogged(false);
      navigate("/login");
    } else if (fecthUser()) {
      fetchAllnotes();
      navigate("/");
    } else {
      setLogged(false);
      navigate("/login");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  return (
    <Context.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        Logout,
        Logged,
        LoginUsr,
        createNewUser,
        User,
        fetchAllnotes,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context };
export default NoteState;
