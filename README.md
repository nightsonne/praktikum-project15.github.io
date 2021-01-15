# https://nightsonne.students.nomoreparties.xyz

### 15я проектная работа на курсе
В данном проекте добавлены централизованная обработка ошибок, логгирование ошибок и запросов в API.
API развернут на облачном сервисе cloud.yandex.ru

Публичный IP-адрес сервера: 84.201.156.246
Доменные имена https://nightsonne.students.nomoreparties.xyz и https://www.nightsonne.students.nomoreparties.xyz доступны по протоколам http и https

Запросы, которые обрабатывает сервер:

- запрос GET /signup создает пользователя в БД, при регистрации необходимо заполнить поля name, about, avatar, email, password;
- запрос GET /signin позволяет авторизоваться уже созданному пользователю по емейлу и паролю;
- запрос GET /users возвращает всех пользователей из базы для авторизованного пользователя;
- запрос GET /users/:userId возвращает конкретного пользователя для авторизованного пользователя;
- запрос GET /cards возвращает все карточки всех пользователей для авторизованного пользователя;
- запрос POST /cards создаёт карточку конкретного пользователя, при создании необходимо заполнить поля name и link;
- запрос DELETE /cards/:cardId удаляет карточку конкретного пользователя, другой пользователь не может удалить чужую карточку

### Версия проекта:
v1.0.0

### Автор:
Татьяна Лунькова

### npm-пакеты:
- bcryptjs: 2.4.3,
- body-parser: 1.19.0,
- express: 4.17.1,
- jsonwebtoken: 8.5.1,
- mongoose: 5.11.10,
- validator: 13.5.2,
- celebrate: 13.0.4,
- dotenv: 8.2.0,
- winston: 3.3.3,
- express-winston: 4.0.5,
- helmet: 4.3.1

### Запуск сервера:
`npm run start` - production
`npm run dev` - development
