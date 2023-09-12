const express = require('express');
const app = express();
const hhRouter = require('./modules/hh/hh.service')

app.use(express.json())

app.use('/hh', hhRouter);

app.listen(4000, () => {
  console.log('Сервер запущен на порту 4000');
});