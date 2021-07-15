const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const jwtSECRET = config.get('jwtSECRET');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route    GET api/auth
// @Desc     Load User route 
//@access    Private
router.get('/', auth, async (req, res) => {
    try {
        console.log("hie")
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

// @route    POST api/auth/login
// @Desc     Login the user 
//@access    Public
router.post('/login', [
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() })

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({errors : [{msg : 'Invalid Credentials'}]})
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) return res.status(400).json({errors : [{msg : 'Invalid Credentials'}]})

        // return jwt
        const payload = {
            user: {
                id: user.id,
                email : user.email
            }
        }
        jwt.sign(payload , jwtSECRET , {expiresIn : 360000} , (err , token) => {
            if(err) throw err;
            res.json({msg : "Welcome Back" ,token : token})
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;