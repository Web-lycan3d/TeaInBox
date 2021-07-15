const mongoose = require('mongoose');
const config = require('config')
const User = require('../models/User');

const mongoURI = config.get("mongoURI" )

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI  , { useNewUrlParser: true , useUnifiedTopology: true  });
        console.log("Database is Connected")
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;