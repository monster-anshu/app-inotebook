import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../context/NoteState";

export const Navbar = () => {
  let location = useLocation();
  const { Logout, Logged } = useContext(Context);
  const LogoutButton = () => {
    return (
      Logged && (
        <button
          className="btn btn-primary mx-1"
          onClick={(e) => {
            e.preventDefault();
            Logout();
          }}
        >
          Logout
        </button>
      )
    );
  };
  const LoginButton = () => {
    if (location.pathname === "/login") return <></>;
    return (
      !Logged && (
        <Link className="btn btn-primary mx-1" to="/login" role="button">
          Login
        </Link>
      )
    );
  };
  const SignUpButton = () => {
    if (location.pathname === "/signup") return <></>;
    return (
      !Logged && (
        <Link className="btn btn-primary mx-1" to="/signup" role="button">
          SignUp
        </Link>
      )
    );
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link  ${
                    location.pathname === "/" ? " active" : ""
                  } `}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link  ${
                    location.pathname === "/about" ? " active" : ""
                  } `}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <LoginButton />
              <SignUpButton />
              <LogoutButton />
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};
