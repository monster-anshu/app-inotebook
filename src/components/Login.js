import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/NoteState";
import { alertContext } from "../context/AlertContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { showAlert, setLoading } = useContext(alertContext);
  const [Show, setShow] = useState(false);
  const { LoginUsr, Logged } = useContext(Context);

  const [value, setValue] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const submit = async (form) => {
    setLoading(true);
    form.preventDefault();
    setShow(false);
    if (await LoginUsr(value)) {
      setValue({ email: "", password: "" });
      setLoading(false);
      return;
    }
    showAlert("danger", "Invalid login details !");
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
    if (Logged) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="login-form">
        <form onSubmit={submit}>
          <div className="avatar">
            <i className="fa-solid fa-family">A</i>
          </div>
          <h4 className="modal-title">Login to Your Account</h4>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              required="required"
              name="email"
              onChange={onChange}
              value={value.email}
            />
          </div>
          <div className="form-group">
            <input
              type={Show ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              required="required"
              name="password"
              onChange={onChange}
              value={value.password}
            />
          </div>
          <div className="form-group small clearfix">
            <label className="checkbox-inline">
              <input
                type="checkbox"
                onClick={() => {
                  Show ? setShow(false) : setShow(true);
                }}
              />{" "}
              Show Password
            </label>
          </div>
          <input
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            value="Login"
          />
        </form>
        <div className="text-center small">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
