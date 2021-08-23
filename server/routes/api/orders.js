/** @format */

const express = require("express");
const router = express.Router();
//for receipt
const { v4: uuidv4 } = require("uuid");
const auth = require("../../middleware/auth");
const Order = require("../../models/Orders");
const shortid = require("shortid");
const User = require("../../models/User");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const transport = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
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
      const oid = shortid.generate();
      const updateUserOrder = await User.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            "orders.orderdItems": {
              orderId: oid,
              status: "Order Processing",
              orderCancel: false,
              email: userData.email,
              phoneNumber: userData.phoneNumber,
              Address: userData.address,
              Pincode: userData.pincode,
              City: userData.city,
              orderDate: orderD,
              orderTotal: total,
              orderdData: userOrder,
            },
          },
        },
        { new: true }
      );
      const updatetotal = await Order.updateOne(
        { userId: id },
        { $push: { orderTotal: total } }
      );
      const updateOrdersModel = await Order.findOneAndUpdate(
        { userId: id },
        {
          $push: {
            orderdItems: {
              orderId: oid,
              orderCancel: false,
              email: userData.email,
              phoneNumber: userData.phoneNumber,
              Address: userData.address,
              Pincode: userData.pincode,
              City: userData.city,
              orderDate: orderD,
              orderTotal: total,
              orderdData: userOrder,
            },
          },
        }
      );
      transport
        .sendMail({
          to: userData.email,
          from: "support@teainbox.in",
          subject: "Order successfull",
          html: `<head>
           <style type="text/css">
            body, p, div {
              font-family: Helvetica, Arial, sans-serif;
              font-size: 14px;
              display:flex;
              flex-direction: column;
              justify-content:flex-start;
            }
            p{
                font-weight:600;
                margin:0.6rem 0
            }
           h3{
              font-size:30px;
              font-weight:700;
           }
           h5{
              font-size:30px;
           }
           span{
            display:block;
           font-size:12px;
           font-weight:400;
           }
            center{
              display:flex,
              align-items: center;
            }
            img{
              width:120px,
              height:120px
            }
          </style>
            <title></title>
          </head>
          <body>
            <h3>Thank you for your purchase!</h3>
            <img src="https://i.ibb.co/YBDh2Pv/Group-4445.png" alt="err" />
            <p>View your order or Visit our website <a href="www.teainbox.in" >click here</a> </p>
            <h5>Order summary</h5>
            <p>OrderID: ${oid} </p>
            <p>OrderTotal: ${total} </p>
            <p>Customer information</p>
            <p>OrderAddress: ${userData.username}</p>
            <p>UserPhonenumber : ${userData.phoneNumber}</p>
            <p>Shipping Details</p>
            <p>Address: ${userData.address} |City: ${userData.city} |Pincode: ${userData.pincode}</p>
          </body>`,
        })
        .then((res1) => {
          console.log(res1, userData);
        })
        .catch((err) => {
          console.log(err);
        });
      return res.status(200).json({ message: "updated" });
    } else {
      const oid2 = shortid.generate();
      const updateUserOrders = await User.findByIdAndUpdate(
        { _id: req.user.id },
        {
          orders: {
            orderTotal: total,
            userName: userDetails.username,
            userId: id,
            email: userData.email,
            orderdItems: [
              {
                orderId: oid2,
                status: "Order Processing",
                email: userData.email,
                orderCancel: false,
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
        userName: updateUserOrders.username,
        email: userData.email,
        userId: id,
        orderdItems: {
          orderId: oid2,
          email: userData.email,
          orderCancel: false,
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

      transport
        .sendMail({
          to: userData.email,
          from: "support@teainbox.in",
          subject: "Order successfull",
          html: `<head>
          <style type="text/css">
           body, p, div {
             font-family: Helvetica, Arial, sans-serif;
             font-size: 14px;
             display:flex;
             flex-direction: column;
             justify-content:flex-start;
           }
           p{
               font-weight:600;
               margin:0.6rem 0
           }
          h3{
             font-size:30px;
             font-weight:700;
          }
          h5{
            font-size:22px;
          }
          img{
            width:120px,
            height:120px
          }
          span{
           display:block;
          font-size:12px;
          font-weight:400;
          }
           center{
             display:flex,
             align-items: center;
           }
         
         </style>
           <title></title>
         </head>
         <body>
           <h3>Thank you for your purchase!</h3>
           <img src="https://i.ibb.co/YBDh2Pv/Group-4445.png" alt="err" />
           <p>View your order or Visit our website <a href="www.teainbox.in" >click here</a> </p>
           <h5>Order summary</h5>
           <p>OrderID: ${oid} </p>
           <p>OrderTotal: ${total} </p>
           <p>Customer information</p>
           <p>OrderAddress: ${userData.username}</p>
           <p>UserPhonenumber : ${userData.phoneNumber}</p>
           <p>Shipping Details</p>
           <p>Address: ${userData.address} | City: ${userData.city} | Pincode: ${userData.pincode}</p>
         </body>   
          `,
        })
        .then((res1) => {
          console.log(res1);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return res.status(200).json({ message: "order created" });
  } catch (error) {
    return res.status(404).json({ message: "server error" });
  }
});

router.post("/cancel/:id", auth, async (req, res) => {
  const { id } = req.user;
  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: { "orders.orderdItems.$[e1].orderCancel": true },
    },
    {
      arrayFilters: [
        {
          "e1.orderId": req.body.orderId,
        },
      ],
    }
  );
  const updateOrder = await Order.findOneAndUpdate(
    { userId: id },
    {
      $set: { "orderdItems.$[e1].orderCancel": true },
    },
    {
      arrayFilters: [
        {
          "e1.orderId": req.body.orderId,
        },
      ],
    }
  );
  res.json({ message: "updated" });
});
module.exports = router;
