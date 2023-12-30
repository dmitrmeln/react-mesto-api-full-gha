const router = require('express').Router();
const cookieParser = require('cookie-parser');
// const { celebrate, Joi, errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/constants');

const SearchError = require('../errors/search-error');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

router.use(cookieParser());
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(authMiddleware);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res, next) => next(new SearchError('Страница не найдена')));

// router.use(errors());

module.exports = router;
