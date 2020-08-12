import React from "react";

const Imagehelper = ({ product }) => {
  const imageUrl = product
    ? product?.image
    : `https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default Imagehelper;
