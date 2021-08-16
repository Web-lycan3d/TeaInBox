/** @format */

const express = require("express");
const router = express.Router();
//for receipt
const { v4: uuidv4 } = require("uuid");
const auth = require("../../middleware/auth");
const Order = require("../../models/Orders");
const shortid = require("shortid");

router.post("/", auth, async (req, res) => {
  let { userOrder, total, userData } = req.body;

  const { id } = req.user;
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userDetails = await User.findOne({ _id: id });
    let orderD = new Date().toLocaleDateString();

    if (userDetails.orders) {
      const updateUserOrder = await User.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            "orders.orderdItems": {
              orderDate: orderD,
              orderTotal: total,
              orderdData: userOrder,
            },
          },
        }
      );
      const updateOrdersModel = await Order.findOneAndUpdate(
        { userId: id },
        {
          $push: {
            orderdItems: {
              orderDate: orderD,
              orderTotal: total,
              orderdData: userOrder,
            },
          },
        }
      );
      return res.status(200).json({ message: "updated" });
    } else {
      const updateUserOrders = await User.findByIdAndUpdate(
        { _id: req.user.id },
        {
          orders: {
            orderTotal: total,
            orderId: userDetails.orders?.orderId
              ? userDetails.orders.orderId
              : shortid.generate(),
            userName: userDetails.username,
            userId: id,
            email: userData.email,
            orderdItems: [
              {
                phoneNumber: userData.phoneNumber,
                Address: userData.address,
                Pincode: userData.pincode,
                City: userData.city,
                orderDate: orderD,
                orderTotal: total,
                orderdData: userOrder,
              },
            ],
          },
        },
        { new: true }
      );
      const orderDetails = {
        orderTotal: total,
        orderId: updateUserOrders.orders.orderId,
        userName: updateUserOrders.username,
        email: userData.email,

        userId: id,
        orderdItems: {
          phoneNumber: userData.phoneNumber,
          Address: userData.address,
          Pincode: userData.pincode,
          City: userData.city,
          orderDate: orderD,
          orderTotal: total,
          orderdData: userOrder,
        },
      };
      const order = new Order(orderDetails);
      await order.save();
    }
    return res.status(200).json({ message: "order created" });
  } catch (error) {
    return res.status(404).json({ message: "server error" });
  }
});
module.exports = router;
