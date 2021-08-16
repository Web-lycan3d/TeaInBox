/** @format */

import React from "react";

import "./cartbox.styles.scss";
import OrderItems from "./OrderItems";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { MdExpandLess } from "react-icons/md";

const CartBox = ({ items, count, orderId }) => {
  return (
    <div className="cart-box">
      <Accordion className="box">
        <AccordionSummary expandIcon={<MdExpandLess />}>
          <div className="item-details">
            <span>Item: {count}</span>

            <span>
              orderd on: {items.orderDate} | OrderId : {orderId}
            </span>
            <p>
              Total &nbsp; <span> ₹{items.orderTotal}</span>{" "}
            </p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="items-orderd">
            {items.orderdData?.map((orderdItem) => (
              <OrderItems item={orderdItem} />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CartBox;
