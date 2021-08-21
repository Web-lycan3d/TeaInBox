/** @format */

const mongoose = require("mongoose");

UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  googleId: String,
  email: {
    type: String,
    required: true,
  },
  password: String,

  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  cart: [
    {
      itemName: String,
      itemPrice: String,
      itemId: String,
      itemImageUrl: String,
      date: {
        type: Date,
        default: new Date().toDateString(),
      },
      itemQuanity: {
        type: Number,
        default: 1,
      },
    },
  ],
  orders: {},
  favProducts: [{}],
});

module.exports = User = mongoose.model("user", UserSchema);
