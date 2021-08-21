/** @format */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;

// Connecting to database
connectDB();
// Intializing Middlewear
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("API Running"));

app.use("/api/user", require("./routes/api/users"));
app.use("/api/order", require("./routes/api/orders"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/razorpay", require("./routes/api/razorpay"));
app.use("/api/google", require("./routes/api/googleAuth"));

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
