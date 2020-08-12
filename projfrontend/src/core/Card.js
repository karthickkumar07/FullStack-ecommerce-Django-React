import React, { useState } from "react";
import Imagehelper from "./helper/Imagehelper";
import { Redirect } from "react-router-dom";
import { addItemTocart, removeItemFromCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [redirect1, setRedirect1] = useState(false);

  const addToCart = () => {
    if (isAuthenticated()) {
      addItemTocart(product, () => {
        setRedirect(true);
      });
      console.log("Added to cart");
    } else {
      console.log("Login please");
      setRedirect1(true);
    }
  };

  const getAredirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const getAredirect1 = (redirect1) => {
    if (redirect1) {
      return <Redirect to="/signin" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-sm btn-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-sm btn-block btn-danger "
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-secondary border border-info ">
      <div className="card-header lead ">{product.name}</div>
      <div className="card-body">
        {getAredirect(redirect)}
        {getAredirect1(redirect1)}
        <Imagehelper product={product} />
        <p className="lead bg-dark font-weight-normal text-wrap">
          {product.description}
        </p>
        <p className="btn btn-success btn-sm rounded  btn-sm px-2">
          $ {product.price}
        </p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
