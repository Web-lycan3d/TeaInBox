/** @format */

import React from "react";
import Product1 from "./Product1";

const ProductContainer = ({ product }) => {
  return (
    <>
      <div className="products">
        <div className="product-text-lava">
          <h3>{product.name}</h3>
          <p>{product.desp}</p>
        </div>
        <div className="products-1">
          {product.items &&
            product.items.map((item) => (
              <Product1
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.imageURL}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductContainer;
