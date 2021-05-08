const jwt = require('jsonwebtoken');


// verifying  if a user  have the right authorization  to access a route
module.exports = function auth(req, res, next) {

    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("No Token found ")
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).send('invalid token');
    }

}