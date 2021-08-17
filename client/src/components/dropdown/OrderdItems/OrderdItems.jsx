/** @format */

import React from "react";
import "./orderditems.styles.scss";
import { BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";

const OrderdItems = ({ data }) => {
  const handleProcessing = async (itemid) => {
    const list = {
      text: "Order Processing",
      id: itemid,
    };
    const resp = await axios.post("/api/user/admin/update", list);
  };
  const handleTransit = async (itemid) => {
    const list = {
      text: "In Transit",
      id: itemid,
    };
    const resp2 = await axios.post("/api/user/admin/update", list);
  };
  const handleDelivered = async (itemid) => {
    const list = {
      text: "Delivered",
      id: itemid,
    };
    const resp3 = await axios.post("/api/user/admin/update", list);
  };
  const handleRefund = async (itemid) => {
    const list = {
      text: "Refund in Process",
      id: itemid,
    };
    const resp4 = await axios.post("/api/user/admin/update", list);
  };
  const handleCancel = async (itemid) => {
    const list = {
      text: "Cancel in Process",
      id: itemid,
    };
    const resp5 = await axios.post("/api/user/admin/update", list);
  };

  return (
    <>
      <div className="dropdown-flow">
        <div className="details-address">
          <p>
            <BiPhone className="address-icons" /> {data.phoneNumber}
          </p>
          <p>
            {" "}
            <AiOutlineMail className="address-icons" /> {data.email}
          </p>
        </div>
        <div className="dropdown-flow-left">
          <div className="items-orderd-list">
            {data.orderdData.map((list) => (
              <span>{`${list.name.substring(0, 3)} | ${list.quantity}`} </span>
            ))}
          </div>
          <div className="items-orderd-address">
            <span>{`${data.Address},${data.City},${data.Pincode} `}</span>
          </div>
        </div>
        <div className="dropdown-flow-right">
          <button
            className="orange"
            onClick={() => handleProcessing(data.orderId)}>
            Order Processing
          </button>
          <button className="blue" onClick={() => handleTransit(data.orderId)}>
            in Transit
          </button>
          <button
            className="green"
            onClick={() => handleDelivered(data.orderId)}>
            Deliverd
          </button>
          <button className="purple" onClick={() => handleRefund(data.orderId)}>
            Refund
          </button>
          <button className="red" onClick={() => handleCancel(data.orderId)}>
            Cancelled
          </button>
        </div>
      </div>{" "}
    </>
  );
};

export default OrderdItems;
