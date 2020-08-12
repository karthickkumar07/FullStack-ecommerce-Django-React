import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, success, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.token) {
          // let sessiontoken = data.token;
          authenticate(data, () => {
            console.log("Token Added");
            setValues({
              ...values,
              didRedirect: true,
              error: "",
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
            error: data.error,
          });
          console.log("error===>>>", error);
        }
      })
      .catch((e) => console.log(e));
  };
  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-warning"
            style={{ display: error ? "" : "none" }}
          >
            {error} Now You can Login
          </div>
        </div>
      </div>
    );
  };
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label htmlFor="" className="text-dark">
                Email
              </label>
              <input
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-dark">
                Password
              </label>
              <input
                className="form-control"
                value={password}
                onChange={handleChange("password")}
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn-danger btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="signin page" description="Tshirt store signin here">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
