const { decode } = require("jsonwebtoken");
const jwt = require("jsonwebtoken")
const secret_key = process.env.secret_key;
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
     const decoded = jwt.verify(token, secret_key);
     req.userId = decoded.userId;
     next();
     } catch (error) {
        console.log(error.message);
     res.status(401).json({ error: 'Invalid token' });
     }
     };


module.exports = verifyToken