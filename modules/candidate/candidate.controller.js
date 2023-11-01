const express = require('express');
const router = express.Router();
const logger = require('../../libs/logger');
const CandidateService = require('./candidate.service');
const { History } = require('./candidate.interface');
const hhApi = require('../hh/hh.api');
const { saveJsonFile, getJsonData } = require('../../libs/jsonLibrary');
const avitoPhoneApi = require('../avito/avito.phone');
const bitrixApi = require('./bitrix.api');
const { default: axios } = require('axios')
const token = 'USERONL80Q3D7S2H5D5BENK4RMDE2T6H8PPUN7DBN7LHLD7S9E6FVTBH6LK13KVE'

// Получить всех кандидатов 
router.get('/', async (req, res) => {
   try {
      const candidats = await CandidateService.getAllCandidate()
      logger.info(`GET /candidate`)
      res.send(candidats)
   } catch (error) {
      logger.error(`GET /candidate \n ${error}`)
      res.status(500)
      res.send(error)
   }
})
// Добавление кандидата с Авито
router.post('/', async (req, res) => {
   try {
      const data = req.body.data
      const description = req.body.description
      let phone = ''
      data.isNorth ? phone = await avitoPhoneApi.getPhoneTwo(data.chatId) : phone = await avitoPhoneApi.getPhoneOne(data.chatId)
      const bxId = await bitrixApi.addCandidateAvito(data, phone)
      const user = await CandidateService.addCandidate(data, description, phone, bxId)
      logger.info(`POST /candidate`)
      res.send(user)
   } catch (error) {
      logger.error(`POST /candidate \n ${error}`)
      res.status(500)
      res.send(error)
   }
})
// Добавление истории по названию файла в HH
router.post('/history/:chat_id', async (req, res) => {
   const chatId = req.params.chat_id
   try {
      const body = req.body
      const history = new History(body.stage, body.description)
      if(body.url) {
         await hhApi.updateCandidat(token, body.url, body.message) 
         await hhApi.url(token, body.url)
         await hhApi.sendMessage(token, body.messageHh, chatId)
         const userHH = await hhApi.getNegotiation(token, chatId)
         await CandidateService.updateUser(chatId, userHH)
      }
      const user = await CandidateService.pushHistory(chatId, history)
      await bitrixApi.updateCandidate(body.stage, body.bxId)
      logger.info(`POST /candidate/history/${chatId}`)

      res.send(user)
   } catch (error) {
      logger.error(`POST /candidate/history/${chatId} \n ${error}`)
      res.status(500)
      res.send(error)
   }
})

// Добавление истории в Avito
router.post('/history/avito/:chat_id', async (req, res) => {
   const chatId = req.params.chat_id
try {
   const body = req.body
   const history = new History(body.stage, body.description)
   const user = await CandidateService.pushHistory(chatId, history)
   bitrixApi.updateCandidate(body.stage, body.bxId)
   logger.info(`POST /candidate/avito/history/${chatId}`)
const timestamp = user.timeUpdate;  // Ваше численное значение времени
   const date = new Date(timestamp * 1000);
   const formattedDate = date.toLocaleDateString('ru-RU');
   const rest = await axios.post('http://127.0.0.1:6060', {
      "chatId": user.data?.chatId,
      "titleVacansy": user.data.titleVacansy,
      "name": user.data.name,
      "phone": user.phone,
      "description": '',
      "time":  formattedDate,
      "stage": user.stage,
      "area": "avito"
   })

   res.send(user)
} catch (error) {
   logger.error(`POST /candidate/avito/history/${chatId} \n ${error}`)
   res.status(500)
   res.send(error)
}
})
router.get('/xl', async (req, res) => {
try {
 const response = await axios.get('http://127.0.0.1:6060/get_file', {
   responseType: 'stream', // Устанавливаем responseType в 'stream' для получения потока данных
 });

 const contentDispositionHeader = response.headers['content-disposition'];
 const filename = contentDispositionHeader
   ? contentDispositionHeader.split('filename=')[1]
   : 'file.bin';

 // Устанавливаем заголовки для скачивания файла
 res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
 res.setHeader('Content-Type', response.headers['content-type']);

 // Перенаправляем поток данных из Axios в поток ответа Express
 response.data.pipe(res);
} catch (error) {
 console.error(error);
 res.status(500).send(error);
}
});

module.exports = router 