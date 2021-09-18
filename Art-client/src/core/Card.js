import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemfromCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f, //function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescription = product ? product.description : "Default Description";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={() => {
            if (isAuthenticated()) {
              addToCart();
            } else {
              alert("You have to be logged in to add Products to Cart.");
            }
          }}
          className="btn btn-block btn-outline-dark rounded mt-2 mb-2"
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
            removeItemfromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-dark rounded mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead font-weight-normal text-wrap">{cartDescription}</p>
        <p className="btn btn-dark rounded text-white  btn-sm px-4">
          <i class="fas fa-rupee-sign"></i> {cartPrice}
        </p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
