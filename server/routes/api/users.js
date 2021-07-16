const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const gravatar = require('gravatar')
const jwtSECRET = config.get('jwtSECRET')

const User = require('../../models/User');


// @route    GET api/user/register
// @Desc     Register a user 
//@access    Public
router.post('/register', [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Enter minimum of 6 characters for Password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({email });

        if (user) return res.status(400).json({ errors: [{ message: "User already exists" }] });

        const avatar = gravatar.url(email, {
            s: 200,
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            username: username,
            email: email,
            password: password, 
            avatar: avatar
        });
        // Hashing the password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //return jwt token once registered
        const payload = {
            user : {
                id: user.id
            }
        }
        jwt.sign(payload , jwtSECRET , {expiresIn: 360000} , (err , token) => {
            if(err) throw err;
            res.json({token});
        })


    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" })
    }
});

// @route    POST api/user/login
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
