import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? ` ${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;
  return (
    <img
      src={imageurl}
      alt="Products"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
      className="mb-3 rounded"
    />
  );
};

export default ImageHelper;
