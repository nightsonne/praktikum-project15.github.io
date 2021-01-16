const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { findAllUsers, findUser } = require('../controllers/users.js');
const auth = require('../middlewares/auth');

router.get('/', auth, findAllUsers);
router.get('/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), findUser);

module.exports = router;
