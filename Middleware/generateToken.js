const jwt = require('jsonwebtoken');
const secret_key = process.env.secret_key
/// to generate a token
 function generateJwtToken(user) {
    const payload = {
      sub: user._id,
      name:user.name
    };
    const secretKey = secret_key; 
    const options = {
      expiresIn: '1d', 
    };
    return jwt.sign(payload, secretKey, options);
  }
  module.exports = generateJwtToken;