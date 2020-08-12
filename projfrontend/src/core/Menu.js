import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#fff",
    };
  } else {
    return {
      color: "#343A40",
    };
  }
};

const Menu = ({ history, path }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-secondary ">
        <li className="nav-item ">
          <Link className="nav-link" to="/" style={currentTab(history, "/")}>
            Home
          </Link>
        </li>

        {isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/cart"
                style={currentTab(history, "/cart")}
              >
                cart
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/user/dashboard"
                style={currentTab(history, "/user/dashboard")}
              >
                UserDashboard
              </Link>
            </li>

            <li className="item ">
              <span
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
                className="nav-link text-warning"
              >
                signout
              </span>{" "}
            </li>
          </Fragment>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                style={currentTab(history, "/signin")}
              >
                signIn
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={currentTab(history, "/signup")}
              >
                signUp
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
