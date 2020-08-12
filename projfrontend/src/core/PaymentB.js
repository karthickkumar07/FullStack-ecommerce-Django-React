import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { cartEmpty } from "./helper/cartHelper";
import { getMeToken, processPayment } from "./helper/PaymentHelper";
import { createOrder } from "./helper/OrderHelper";
import { isAuthenticated, signout } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";
const PaymentB = ({ products, reload = undefined, setReload = (f) => f }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token)
      .then((info) => {
        if (info.error) {
          setInfo({
            ...info,
            error: info.error,
          });
          signout(() => {
            return <Redirect to="/" />;
          });
        } else {
          const clientToken = info.clientToken;
          setInfo({
            clientToken,
          });
        }
      })
      .catch();
  };
  useEffect(() => {
    getToken(userId, token);
  }, []);
  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };
  const onPurchase = () => {
    setInfo({
      loading: true,
    });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((res) => {
            if (res.error) {
              if (res.code == "1") {
                console.log("payment failed");
                signout(() => {
                  return <Redirect to="/" />;
                });
              }
            } else {
              setInfo({
                ...info,
                success: res.success,
                loading: false,
              });
              console.log("payment sucesss");
              let product_names = "";
              products.forEach(function (item) {
                product_names += item.name + ",";
              });
              const orderdata = {
                products: product_names,
                transaction_id: res.transaction.id,
                amount: res.transaction.amount,
              };
              createOrder(userId, token, orderdata)
                .then((response) => {
                  if (response.error) {
                    if (response.code == "1") {
                      console.log("Order Failed");
                    }
                    signout(() => {
                      return <Redirect to="/" />;
                    });
                  } else {
                    if (response.success == true) {
                      console.log("Order Placed");
                    }
                  }
                })
                .catch((e) => {
                  console.log("Order:", e);
                  setInfo({ loading: false, success: false });
                });
              cartEmpty(() => {
                console.log("oops.... Cart emptyed out");
              });
              setReload(!reload);
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };
  const showbtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => {
                info.instance = instance;
              }}
            ></DropIn>
            <button onClick={onPurchase} className="btn-block btn-secondary">
              Buy now
            </button>
          </div>
        ) : (
          <h3>please login first or add something in cart</h3>
        )}
      </div>
    );
  };
  return (
    <div>
      <h1>Your bill is ${getAmount()} </h1>
      {showbtnDropIn()}
    </div>
  );
};

export default PaymentB;
