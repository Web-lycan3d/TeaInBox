/** @format */

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderTotal: [{}],
  orderId: String,
  userName: String,
  email: String,
  orderdItems: [
    {
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
