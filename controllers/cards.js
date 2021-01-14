const Card = require('../models/cards.js');
const NotFound = require('../errors/notfound');
const Forbidden = require('../errors/forbidden');

module.exports.findAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id.toString()) {
          Card.findByIdAndRemove(req.params.id)
            .then((item) => res.status(200).send({ data: item }))
            .catch(next);
        } else {
          throw new Forbidden('В доступе отказано');
        }
      } else {
        throw new NotFound('Произошла ошибка при поиске карточки');
      }
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};
