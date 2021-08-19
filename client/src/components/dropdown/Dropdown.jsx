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

const Dropdown = ({ value, orStatus, st, updateState }) => {
  const total = value.orderTotal.reduce((a, b) => a + b, 0);

  return (
    <div className="dropdown-conatiner">
      <div className="dropdown-contents">
        {" "}
        <Accordion className="dropdown-accord">
          <AccordionSummary expandIcon={<MdExpandLess />}>
            {" "}
            {orStatus && (
              <div
                className={
                  st ? "status-color status-red" : "status-color status-green"
                }>
                {" "}
              </div>
            )}
            <div className="dropdown-details">
              <div className="dropdown-details-left">
                <h1>{value.userName}</h1>
                <div className="dropdown-details-left-user">
                  <span>User id: {value.userId} </span>
                  <span>Email: {value.email} </span>
                </div>
              </div>

              <div className="dropdown-details-right">
                <h2>₹ {total}</h2>
                <span>{convertor.toWords(total) + " only"}</span>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {orStatus ? (
              <div className="items-orderd-flex">
                {value?.orderdItems.map((item, index) =>
                  item.status === "Delivered" ? (
                    <OrderdItems
                      data={item}
                      key={index}
                      userid={value.userId}
                      deliverState={true}
                      updateState={updateState}
                    />
                  ) : (
                    <OrderdItems
                      data={item}
                      key={index}
                      userid={value.userId}
                      deliverState={false}
                      updateState={updateState}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="items-orderd-flex">
                {value?.orderdItems.map((item, index) =>
                  item.status === "Delivered" ? (
                    <OrderdItems
                      data={item}
                      key={index}
                      userid={value.userId}
                      deliverState={true}
                      updateState={updateState}
                    />
                  ) : (
                    <OrderdItems
                      data={item}
                      key={index}
                      userid={value.userId}
                      deliverState={false}
                      updateState={updateState}
                    />
                  )
                )}
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
export default Dropdown;
