const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSECRET = config.get("jwtSECRET")

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) {return res.status(400).json({msg : "No Token. Authorization Denied"})};
    // verify the token
    try {
        const decoded = jwt.verify(token , jwtSECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg : "Token is not valid"})
    }


}