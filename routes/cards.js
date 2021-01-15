const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { findAllCards, deleteCard, createCard } = require('../controllers/cards.js');
const auth = require('../middlewares/auth');

router.get('/', auth, findAllCards);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), auth, deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/),
  }),
}), auth, createCard);

module.exports = router;
