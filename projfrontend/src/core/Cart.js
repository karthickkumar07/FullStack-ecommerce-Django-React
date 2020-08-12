import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";

const Cart = () => {
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const loadAllProducts = (products) => {
    return (
      <div>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              reload={reload}
              setReload={setReload}
            />
          );
        })}
      </div>
    );
  };
  const checkOut = () => {
    return <h1>Checkout</h1>;
  };

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <Base title="Cart Page" description="Go and Shop more">
      <div className="row text-center">
        <div className="col-6 text-dark">
          {products.length == 0 ? (
            <h1>No products In the basket</h1>
          ) : (
            loadAllProducts(products)
          )}
        </div>
        <div className="col-6 text-dark">
          {products.length > 0 ? (
            <PaymentB products={products} setReload={setReload} />
          ) : (
            <h3>Your cart is empty now</h3>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
