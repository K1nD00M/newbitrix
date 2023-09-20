const express = require('express');
const router = express.Router();
const logger = require('../../libs/logger');
const CandidateService = require('./candidate.service');
const { History } = require('./candidate.interface');

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

// Добавление истории по названию файла
router.post('/history/:chat_id', async (req, res) => {
   try {
      const body = req.body
      const chatId = req.params.chat_id
      const history = new History(body.stage, body.description)
      const user = await CandidateService.pushHistory(chatId, history)
      logger.info(`POST /candidate/history/${chatId}`)

      res.send(user)
   } catch (error) {
      logger.error(`POST /candidate/history/${chatId} \n ${error}`)
      res.status(500)
      res.send(error)
   }
})

// Изменить телефон
router.put('/phone/:chat_id', async (req, res) => {
   try {
      const phone = req.body.phone
      const chatId = req.params.chat_id
      const user = await CandidateService.updatePhone(chatId, phone)
      logger.info(`POST /candidate/history/${chatId}`)

      res.json(user)
   } catch (error) {
      logger.error(`POST /candidate/history/${chatId} \n ${error}`)
      res.status(500)
      res.send(error)
   }
})


module.exports = router 