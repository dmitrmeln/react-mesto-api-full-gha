const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('./config');

const generateWebToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });

const verifyWebToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  generateWebToken,
  verifyWebToken,
};

// const verifyWebToken = (token) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
//   if (err) {
//     return false;
//   }

//   return userModel.findById(decoded.id)
//     .orFail(() => false)
//     .then(() => decoded)
//     .catch(() => false);
// });
