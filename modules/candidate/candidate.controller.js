const express = require('express');
const router = express.Router();
const logger = require('../../libs/logger');
const CandidateService = require('./candidate.service');
const { History } = require('./candidate.interface');
const hhApi = require('../hh/hh.api');
const { saveJsonFile, getJsonData } = require('../../libs/jsonLibrary');
const avitoPhoneApi = require('../avito/avito.phone');
const bitrixApi = require('./bitrix.api');

const token = 'USERQLEJOJIKE8V2MHLL2984K1HS98VPFIRAST1F0F9KR6841N8JM2CBQTFKQH61'

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
      const user = await CandidateService.addCandidate(data, description, phone)
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
   try {
      const body = req.body
      const chatId = req.params.chat_id
      const history = new History(body.stage, body.description)
      const user = await CandidateService.pushHistory(chatId, history)
      bitrixApi.updateCandidate(body.stage, body.bxId)
      logger.info(`POST /candidate/avito/history/${chatId}`)

      res.send(user)
   } catch (error) {
      logger.error(`POST /candidate/avito/history/${chatId} \n ${error}`)
      res.status(500)
      res.send(error)
   }
})

module.exports = router 