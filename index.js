const express = require('express');
const app = express();
const hhRouter = require('./modules/hh/hh.controller');
const avitoRouter = require('./modules/avito/avito.controller');
const candidateRouter = require('./modules/candidate/candidate.controller');
const tokenObject = require('./modules/avito/avito.access');
const cron = require('node-cron');
const cors = require('cors')
app.use(cors());

(async () => {
   app.use(express.json())

   await tokenObject.readTokenFromFile()
   cron.schedule('0 0 * * *', () => tokenObject.getNewToken());

   app.use('/hh', hhRouter);
   app.use('/avito', avitoRouter)
   app.use('/candidates', candidateRouter)
   
   app.listen(4000, () => {
     console.log('Сервер запущен на порту 4000');
   });
})()
