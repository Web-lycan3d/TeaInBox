/** @format */

import React from "react";
import Heart from "../svg/Heart";
import { BsBag } from "react-icons/bs";
import ReactTooltip from "react-tooltip";

const Product1 = ({ name, price, image }) => {
  return (
    <div className="product-1-box">
      <div className="product-likes">
        <span className="heart-icon" data-tip="Like">
          <Heart />
        </span>
      </div>
      <ReactTooltip />
      <div className="product-1-img">
        <img src={image} alt="error" />
      </div>
      <div className="product-1-text-box">
        <div className="product-1-text">
          <p>{name}</p>
          <span>INR :{price}</span>
        </div>
        <div className="product-1-cart">
          <span className="bag-icon" data-tip="Add to Cart">
            <BsBag />
          </span>
          <ReactTooltip />
        </div>
      </div>
    </div>
  );
};

export default Product1;
