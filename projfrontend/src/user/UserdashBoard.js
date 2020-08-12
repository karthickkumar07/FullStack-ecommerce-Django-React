import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import Card from "../core/Card";
import { getProducts } from "../core/helper/coreapicalls";

const UserdashBoard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          console.log(error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };
  const show = (product, index) => {
    return index <= 2 ? <Card product={product} /> : <h2>helo</h2>;
  };
  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <Base title="User Dashboard" description="Welcome to user dashboard">
      <h2 className="text-center text-dark">
        Are you looking for these kind of coding tees??
      </h2>
      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-4   mb-4">
              {/* {index % 2 == 0} ? (<Card product={product} />) : (<h2>helo</h2>) */}
              {show(product, index)}
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default UserdashBoard;
