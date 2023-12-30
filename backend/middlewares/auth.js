const { verifyWebToken } = require('../utils/jwt');
const UnauthorizedError = require('../errors/unauthorized-error');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация.'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = verifyWebToken(token);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация.'));
  }

  req.user = payload;
  return next();
}

module.exports = auth;

// function auth(req, res, next) {
//   const { cookie } = req.headers;
//   // const token = cookie.replace('jwt=', '');
//   const token = req.headers.authorization;

//   let payload;

//   try {
//     payload = verifyWebToken(token);

//     // if (!token || verifyWebToken(token) === false) {
//     //   return next(new UnauthorizedError('Запрещено.'));
//     // }
//   } catch (err) {
//     return next(new UnauthorizedError('Запрещено.'));
//   }

//   // if (!token || verifyWebToken(token) === false) {
//   //   return next(new UnauthorizedError('Запрещено.'));
//   // }
//   req.user = payload;
//   console.log(req.user)
//   next();
// }
