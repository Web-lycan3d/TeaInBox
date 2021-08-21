/** @format */

const express = require("express");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("config");
const jwtSECRET = config.get("jwtSECRET");
router.post("/login", async (req, res) => {
  const { googleUser, token } = req.body;
  const userExists = await User.findOne({ googleId: googleUser.googleId });
  if (userExists) {
    const payload = {
      user: {
        id: userExists.id,
      },
    };

    jwt.sign(payload, jwtSECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } else {
    const saveUser = new User({
      googleId: googleUser.googleId,
      email: googleUser.email,
      username: googleUser.name,
      avatar: googleUser.imageUrl,
    });
    await saveUser.save();
    const payload = {
      user: {
        id: saveUser.id,
      },
    };

    jwt.sign(payload, jwtSECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  }
});

module.exports = router;
