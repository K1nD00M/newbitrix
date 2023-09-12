const express = require('express');
const app = express();
const authRouter = require('./src/auth/auth.controller')

app.use('/', authRouter);

app.listen(4000, () => {
  console.log('Сервер запущен на порту 4000');
});