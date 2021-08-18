/** @format */

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderTotal: [{}],

  userName: String,

  orderdItems: [
    {
      status: {
        type: String,
        default: "Order Processing",
      },
      orderId: String,
      email: String,
      phoneNumber: String,
      Address: String,
      Pincode: String,
      City: String,
      orderDate: String,
      orderTotal: String,
      orderdData: {},
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
