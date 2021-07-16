const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route    GET api/aut
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

module.exports = router;