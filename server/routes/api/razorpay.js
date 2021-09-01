/** @format */

const express = require("express");
const router = express.Router();
//for receipt

const shortid = require("shortid");
const crypto = require("crypto");

const Razorpay = require("razorpay");
const port = process.env.PORT || 5000;

// const key = () => {
//   console.log(process.env.PORT);
//   if (process.env.NODE_ENV === "development") {
//     return false;
//   }
//   if (process.env.NODE_ENV === "production") {
//     return "https://obscure-fjord-91444.herokuapp.com";
//   }
// };

// testky:rzp_test_6zVUH0RpvBsqx6
// key_secret: "tjqyJQYzXaCNdCTUUGnFArBt"

const instance = new Razorpay({
  key_id: "rzp_live_nce88IhegilKjE",
  key_secret: "HE39kjPK87ckhn5K1RrXeL9N",
});

router.post("/", async (req, res) => {
  const { userAddress, total } = req.body;
  const options = {
    amount: `${total}00`,
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture: 0,
  };

  try {
    const resp = await instance.orders.create(options);

    if (resp) {
      res.status(200).json(resp);
    } else {
      res.status(400).send("error");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});
router.post("/capture/:id", async (req, res) => {
  const text = req.body.data.id + "|" + req.body.paymentId;
  try {
    const hash = crypto.createHmac("sha256", "HE39kjPK87ckhn5K1RrXeL9N");
    hash.update(text);
    const digest = hash.digest("hex");
    if (digest == req.params.id) {
      console.log("s");
      return res.json({ payment: true, message: "verified" });
    } else {
      return res.json({ payment: false, message: "not verified" });
    }
  } catch (error) {
    res.status(400).send("server error");
  }
});
module.exports = router;
