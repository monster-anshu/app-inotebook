import React, { useState, useContext } from "react";
import { alertContext } from "../context/AlertContext";
import { Link } from "react-router-dom";
import { Context } from "../context/NoteState";

function SignUp() {
  const { showAlert, setLoading } = useContext(alertContext);
  const { createNewUser } = useContext(Context);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [Show, setShow] = useState(false);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const signup = async (form) => {
    form.preventDefault();
    if (
      user.name.length < 5 ||
      user.email.length < 5 ||
      user.password.length < 6
    ) {
      showAlert("danger", "Credentials are too short must > 5 !");
      return;
    }
    if (user.password === user.confirm_password) {
      const newUser = {
        name: user.name,
        email: user.email,
        password: user.password,
      };
      setLoading(true);
      if (!(await createNewUser(newUser))) {
        showAlert("danger", "Email Already exist !");
      }
      setShow(false);
      setLoading(false);
      return;
    }
    showAlert("danger", "Password does't match !");
  };
  return (
    <div className="signup">
      <div className="signup-form">
        <form onSubmit={signup}>
          <h2>Create Account</h2>
          <p className="lead">
            It's free and hardly takes more than 30 seconds.
          </p>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
                required="required"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-paper-plane"></i>
              </span>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email Address"
                required="required"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type={Show ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Password"
                required="required"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-lock"></i>
                <i className="fa fa-check"></i>
              </span>
              <input
                type={Show ? "text" : "password"}
                className="form-control"
                name="confirm_password"
                placeholder="Confirm Password"
                required="required"
                onChange={onChange}
              />
            </div>
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
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Sign Up
            </button>
          </div>
          <p className="small text-center">
            By clicking the Sign Up button, you agree to our <br />
            <a href="/">Terms &amp; Conditions</a>, and{" "}
            <a href="/">Privacy Policy</a>.
          </p>
        </form>
        <div className="text-center">
          Already have an account? <Link to="/login">Login here</Link>.
        </div>
      </div>
    </div>
  );
}

export default SignUp;
