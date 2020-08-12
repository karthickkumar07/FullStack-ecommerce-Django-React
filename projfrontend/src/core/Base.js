import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-light text-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-light text-dark text-center">
          <h2 className="display-4">
            {title}{" "}
            <img
              src="https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG71.png"
              width="70"
              height="70"
              alt=""
            />
          </h2>
          <p className="lead">{description}</p>
          <div className={className}>{children}</div>
        </div>
      </div>
      <footer className="footer bg-secondary  mb-0 py-3">
        <div className="container-fluid bg-secondary text-dark text-center py-3">
          <h4>If you got any queries ,reach me out on instagram.</h4>
          <button className="btn-dark btn-lg">contact us</button>
          <div className="container">
            <span className="text-dark">
              An Amazing Django React Full stack course
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Base;
