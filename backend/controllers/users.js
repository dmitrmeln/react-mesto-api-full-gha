const validator = require('validator');
const bcrypt = require('bcrypt');
const userModel = require('../models/user');

const { generateWebToken } = require('../utils/jwt');
const SearchError = require('../errors/search-error');
const BadRequestError = require('../errors/bad-request-error');
const RegistrationError = require('../errors/registration-error');
const ServerError = require('../errors/server-error');
const UnauthorizedError = require('../errors/unauthorized-error');

const { SALT_ROUNDS } = require('../utils/config');

const {
  gotSuccess,
} = require('../utils/constants');

function handleUserUpdate(req, res, next, options) {
  return userModel
    .findByIdAndUpdate(
      req.user.id,
      options,
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(new SearchError('Пользователь с указанным _id не найден.'))
    .then((user) => res.status(gotSuccess.status).send(user))
    .catch(next);
}

function updateUserInfo(req, res, next) {
  const updateData = { name: req.body.name, about: req.body.about };

  return handleUserUpdate(req, res, next, updateData);
}

function updateUserAvatar(req, res, next) {
  const updateData = { avatar: req.body.avatar };

  return handleUserUpdate(req, res, next, updateData);
}

function readUser(req, res, next) {
  const { userId } = req.params;

  return userModel
    .findById(userId)
    .orFail(new SearchError('Пользователь с указанным _id не найден.'))
    .then((user) => res.status(gotSuccess.status).send(user))
    .catch(next);
}

function readCurrentUser(req, res, next) {
  const { id } = req.user;

  return userModel
    .findOne({ _id: id })
    .orFail(new SearchError('Пользователь с указанным _id не найден.'))
    .then((user) => res.status(gotSuccess.status).send(user))
    .catch(next);
}

function readAllUsers(req, res, next) {
  return userModel
    .find()
    .then((users) => res.status(gotSuccess.status).send(users))
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError('Требуется заполнить email и пароль.'));
  }

  return userModel
    .findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Неправильный email или пароль.'))
    .then((user) => {
      const token = generateWebToken(user._id);

      return bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        }
        if (!isMatch) {
          return next(new UnauthorizedError('Неправильный email или пароль.'));
        }

        return res
          .status(gotSuccess.status)
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
          .send({ token });
      });
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    email, password, name, about, avatar,
  } = req.body;

  if (!email || !password) {
    return next(new BadRequestError('Требуется заполнить email и пароль.'));
  }

  if (!validator.isEmail(email)) {
    return next(new BadRequestError('Некорректный email.'));
  }

  return bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    if (err) {
      next(new ServerError('Ошибка сервера.'));
    }

    return userModel.create({
      email, password: hash, name, about, avatar,
    })
      .then((user) => res.status(201).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      }))
      .catch((error) => {
        if (error.name === 'MongoServerError' && error.code === 11000) {
          return next(new RegistrationError('Пользователь с данным email уже существует.'));
        }
        return next(error);
      });
  });
}

module.exports = {
  createUser,
  updateUserInfo,
  readUser,
  readAllUsers,
  updateUserAvatar,
  login,
  readCurrentUser,
};
