const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const NotFound = require('../errors/notfound');
const DoubleErr = require('../errors/double');
const BadRequest = require('../errors/badrequest');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.findAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        throw new NotFound('Такого пользователя не существует');
      }
    })
    .catch(next);
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const passwordPattern = new RegExp(/^[A-Za-z0-9]{8,}$/);

  if (!passwordPattern.test(password)) {
    return next(new BadRequest('Неверный формат пароля, нельзя использовать пробелы и киррилицу'));
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(200).send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new DoubleErr('Пользователь с таким емейлом уже зарегистрирован'));
      } else {
        next(new BadRequest('Произошла ошибка при создании пользователя'));
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-for-dev', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
