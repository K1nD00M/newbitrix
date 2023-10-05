const express = require('express');
const app = express();
const hhRouter = require('./modules/hh/hh.controller');
const avitoRouter = require('./modules/avito/avito.controller');
const avitoRouterTwo = require('./modules/avito/avitoTwo.controller');
const candidateRouter = require('./modules/candidate/candidate.controller');
const smsRouter = require('./modules/sms/sms.controller')
const tokenObject = require('./modules/avito/avito.access');
const tokenObjectTwo = require('./modules/avito/avitoTwo.access');
const cron = require('node-cron');
const cors = require('cors');
const check = require('./modules/sms/sms.cron');
const www = process.env.WWW || './front/dist';

app.use(cors());
app.use(express.static(www));

(async () => {
   app.use(express.json())

   await tokenObject.readTokenFromFile()
   cron.schedule('0 0 * * *', () => tokenObject.getNewToken());
   await tokenObjectTwo.readTokenFromFile()
   cron.schedule('0 0 * * *', () => tokenObjectTwo.getNewToken());

   check()
   app.get('/', (req, res) => {
      res.sendFile(`index.html`, { root: www });
   });
   app.post('/', (req, res) => {
      res.sendFile(`index.html`, { root: www });
   });
   app.use('/hh', hhRouter);
   app.use('/avito', avitoRouter)
   app.use('/avito/two', avitoRouterTwo)
   app.use('/candidates', candidateRouter)
   app.use('/sms', smsRouter)
   
   app.listen(process.env.port || 4000, () => {
     console.log('Сервер запущен на порту 4000');
   });
})()
