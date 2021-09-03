/** @format */

const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const gravatar = require("gravatar");
const jwtSECRET = config.get("jwtSECRET");
const otpGenerator = require("otp-generator");

const User = require("../../models/User");
const auth = require("../../middleware/auth");
const Order = require("../../models/Orders");
// const accountSid = "ACda19d8de6c9fe4337b21549946054c2a";
// const authToken = "ad99f7ed54e974e3da0fa5e491ccbb2e";
// const client = require("twilio")(accountSid, authToken);

const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const api_key = process.env.API_KEY_MAIL;
const domain = process.env.DOMAIN_MAIN;
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

const transport = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: "",
    },
  })
);

// @route    GET api/user/verify
// @Desc     Verify the email
//@access    Public
router.post("/verify", (req, res) => {
  const { email } = req.body;

  const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });
  const data = {
    from: "support@teainbox.in",
    to: email,
    subject: "User verification for TeaInBox",
    html: `<head>
          <style type="text/css">
         body, p, div {
          font-family: Helvetica, Arial, sans-serif;
          font-size: 14px;
         }
  
       img{
           width:90px;
         height:90px;
           object-fit:contain;
        }
       </style>
       <title></title>
       </head>
        <body>
     <div class="center">
       <img src="https://i.ibb.co/YBDh2Pv/Group-4445.png" alt="err" />
        <p>
         The verification code for TeaInBox is: <strong>${otp}</strong>
       </p>
        </div>
      </body>`,
  };

  mailgun.messages().send(data, function (error, body) {
    if (body) {
      res.status(200).json({ otpValue: otp });
    } else {
      console.log(error);
    }
  });
  // transport
  //   .sendMail({
  //     to: email,
  //     from: "support@teainbox.in",
  //     subject: "User verification for TeaInBox",
  //     html: `<head>
  //     <style type="text/css">
  //       body, p, div {
  //         font-family: Helvetica, Arial, sans-serif;
  //         font-size: 14px;
  //       }
  //       center{
  //         display:flex,
  //         align-items: center;
  //       }
  //      img{
  //        width:120px,
  //        height:120px
  //      }
  //     </style>
  //     <title></title>
  //   </head>
  //   <body>
  //   <center>
  //     <img src="https://i.ibb.co/YBDh2Pv/Group-4445.png" alt="err" />
  //     <p>
  //       The verification code is: <strong>${otp}</strong>
  //     </p>
  //   </center>
  //   </body>`,
  //   })
  //   .then((res1) => {
  //     if (res1.message === "success") {
  //       return res.status(200).json({ otpValue: otp });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

// @route    POST api/user/checkuser
// @Desc     Check User exists
//@access    Public
router.post("/checkuser", async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res.json({ message: "User already exists", userExists: true });
  } else {
    return res
      .status(200)
      .json({ message: "no user Found", userExists: false });
  }
});

// @route    POST api/user/userayuth
// @Desc     User Verification
//@access    Public
router.post("/userauth", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({ userExists: false, wrongPass: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ userExists: true, wrongPass: true });
    } else {
      return res.json({ userExists: true, wrongPass: false });
    }
  } catch (error) {
    res.status(500).send("server error");
  }
});

// @route    GET api/user/register
// @Desc     Register the user
//@access    Public
router.post(
  "/register",
  [
    check("username", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Enter minimum of 6 characters for Password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      // if (user)
      //   return res
      //     .status(400)
      //     .json({ errors: [{ message: "User already exists" }] });

      const avatar = gravatar.url(email, {
        s: 200,
        r: "pg",
        d: "mm",
      });

      user = new User({
        username: username,
        email: email,
        password: password,
        avatar: avatar,
      });
      // Hashing the password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return jwt token once registered
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, jwtSECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route    POST api/user/login
// @Desc     Login the user
//@access    Public
router.post(
  "/login",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // if (!user) {
      //   return res
      //     .status(400)
      //     .json({ errors: [{ msg: "Invalid Credentials" }] });
      // }

      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch)
      //   return res
      //     .status(400)
      //     .json({ errors: [{ msg: "Invalid Credentials" }] });

      // return jwt
      const payload = {
        user: {
          id: user.id,
          email: user.email,
        },
      };
      jwt.sign(payload, jwtSECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ msg: "Welcome Back", token: token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    PATCH api/user/cart
// @Desc    Add item to cart
//@access    Private
router.patch("/cart", auth, async (req, res) => {
  const { id, name, price, imageURL } = req.body;
  let cartitem = {
    itemName: name,
    itemPrice: price,
    itemId: id,
    itemImageUrl: imageURL,
  };

  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { cart: cartitem } },
      { new: true }
    );
    res.json(userData);
  } catch (error) {
    res.status(400).send("error");
  }
});

// @route    PATCH api/user/fav
// @Desc     Add Favorites to the database
//@access    Private
router.patch("/fav", auth, async (req, res) => {
  const { id } = req.user;

  const updateFav = await User.findByIdAndUpdate(
    { _id: id },
    { $push: { favProducts: req.body } },
    { new: true }
  );

  res.json(updateFav);
});

// @route    PATCH api/user/unfav
// @Desc     Remove Favorites to the database
//@access    Private
router.patch("/unfav", auth, async (req, res) => {
  const { id } = req.user;

  const removeFav = await User.findByIdAndUpdate(
    { _id: id },
    { $pull: { favProducts: { id: req.body.id } } },
    { new: true }
  );

  res.json(removeFav);
});

// @route    GET api/user/data
// @Desc     Get User Details of a particular user
//@access    Private
router.get("/data", auth, async (req, res) => {
  const { id } = req.user;
  const userDetails = await User.findOne({ _id: id });
  res.json(userDetails);
});

// @route    PATCH api/user/admin/userdata
// @Desc     Get all the Orders
//@access    Private
router.get("/admin/userdata", auth, async (req, res) => {
  const data = await Order.find({});
  res.json(data);
});

// @route    PATCH api/user/admin/update
// @Desc     Upadte the status of the user
//@access    Private
router.post("/admin/update", auth, async (req, res) => {
  const { id } = req.user;

  const update = await User.findOneAndUpdate(
    { _id: req.body.userid },
    {
      $set: { "orders.orderdItems.$[e2].status": req.body.text },
    },
    {
      arrayFilters: [
        {
          "e2.orderId": req.body.id,
        },
      ],
    }
  );
  const orderUpdate = await Order.findOneAndUpdate(
    {
      userId: req.body.userid,
    },
    { $set: { "orderdItems.$[e1].status": req.body.text } },
    {
      arrayFilters: [{ "e1.orderId": req.body.id }],
    }
  );
  res.json({ message: "updated" });
});

module.exports = router;
