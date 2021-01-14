const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { findAllCards, deleteCard, createCard } = require('../controllers/cards.js');

router.get('/', findAllCards);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/),
  }),
}), createCard);

module.exports = router;
