const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { findAllUsers, findUser } = require('../controllers/users.js');

router.get('/', findAllUsers);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), findUser);

module.exports = router;
