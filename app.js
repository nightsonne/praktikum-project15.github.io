const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const helmet = require('helmet');
const { errors, celebrate, Joi } = require('celebrate');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/loggers');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(/^[A-Za-z0-9]{8,}$/),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().regex(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/),
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(/^[A-Za-z0-9]{8,}$/),
  }),
}), createUser);

app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
