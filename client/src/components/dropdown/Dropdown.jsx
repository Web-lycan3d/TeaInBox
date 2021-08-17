/** @format */

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { MdExpandLess } from "react-icons/md";
import React from "react";
import "./dropdown.styles.scss";
import convertor from "number-to-words";
import OrderdItems from "./OrderdItems/OrderdItems";

const Dropdown = ({ value }) => {
  const total = value.orderTotal.reduce((a, b) => a + b, 0);
  console.log(value);
  return (
    <div className="dropdown-conatiner">
      <div className="dropdown-contents">
        <Accordion className="dropdown-accord">
          <AccordionSummary expandIcon={<MdExpandLess />}>
            <div className="dropdown-details">
              <div className="dropdown-details-left">
                <h1>{value.userName}</h1>
                <div className="dropdown-details-left-user">
                  <span>User id: {value.userId} </span>
                </div>
              </div>
              <div className="dropdown-details-right">
                <h2>₹ {total}</h2>
                <span>{convertor.toWords(total) + " only"}</span>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="items-orderd-flex">
              {value?.orderdItems.map((item, index) => (
                <OrderdItems data={item} key={index} />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Dropdown;
