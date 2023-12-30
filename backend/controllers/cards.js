const cardModel = require('../models/card');
const SearchError = require('../errors/search-error');
const ForbiddenError = require('../errors/forbidden-error');

const {
  gotSuccess,
  successCreated,
} = require('../utils/constants');

function handleLike(req, res, next, successCode, options) {
  const { cardId } = req.params;

  return cardModel
    .findByIdAndUpdate(cardId, options, { new: true })
    .orFail(new SearchError('Карточка с указанным _id не найдена.'))
    .then((card) => res.status(successCode.status).send(card))
    .catch(next);
}

function likeCard(req, res, next) {
  return handleLike(req, res, next, successCreated, { $addToSet: { likes: req.user.id } });
}

function dislikeCard(req, res, next) {
  return handleLike(req, res, next, gotSuccess, { $pull: { likes: req.user.id } });
}

function readAllCards(req, res, next) {
  return cardModel
    .find()
    .then((cards) => res.status(gotSuccess.status).send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;

  return cardModel
    .create({ name, link, owner: req.user.id })
    .then((card) => res.status(successCreated.status).send(card))
    .catch(next);
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user.id;

  return cardModel
    .findById(cardId)
    .orFail(new SearchError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw new ForbiddenError('У вас нет прав для удаления данной карточки.');
      }
      return cardModel.deleteOne(card);
    })
    .then(() => res.status(gotSuccess.status).send({ message: 'Карточка успешно удалена.' }))
    .catch(next);
}

module.exports = {
  createCard,
  deleteCard,
  readAllCards,
  likeCard,
  dislikeCard,
};
