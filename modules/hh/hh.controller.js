const express = require('express');
const HHService = require('./hh.service');
const router = express.Router();
const logger = require('../../libs/logger');
const hhApi = require('./hh.api');

const token = 'USERQLEJOJIKE8V2MHLL2984K1HS98VPFIRAST1F0F9KR6841N8JM2CBQTFKQH61'

router.get('/query', async (req, res) => {
   const code = req.query.code
   try {
      const result = await HHService.getJwtInCode(code)
      logger.info('GET /hh/query')
      res.redirect('https://vodovoz.bitrix24.ru/marketplace/app/169/')
   } catch (error) {
      res.status(500)
      logger.error(`GET /hh/query \n${error}`)
      res.send(error)
   }
});
router.get('/messages/:id', async (req, res) => {
   const id = req.params.id
   try {
      const messages = await hhApi.getMessages(token, id)
      logger.info(`GET /hh/messages/${id}`)
      res.send(messages)
   } catch (error) {
      res.status(500)
      logger.error(`GET /hh/messages \n${error}`)
      res.send('Возникла ошибка при обработке запроса. Повторите попытку')
   }
});
router.post('/messages/:id', async (req, res) => {
   const id = req.params.id
   const message = req.body.message
   try {
      await hhApi.sendMessage(token, message, id)
      const newMessages = await hhApi.getMessages(token, id)
      logger.info(`POST /messages/${id}`)
      
      res.json(newMessages)
   } catch (error) {
      res.status(500)
      logger.error(`POST /messages/${id} \n${error}`)
      res.send(error)
   }
})
router.post('/command', async (req, res) => {
   const url = req.body.url
   try {
      const data = await hhApi.url(token, url)
      logger.info(`Post /hh/${url}`)
      res.send(data)
   } catch (error) {
      res.status(500)
      logger.error(`GET /hh/${url} \n${error}`)
      res.send('Возникла ошибка при обработке запроса. Повторите попытку')
   }
})
router.post('/pdf', async (req, res) => {
   const url = req.body.url
   try {
      const data = await hhApi.getPdf(token, url)
      logger.info(`GET /hh/pdf`)
      
      res.send(data)
   } catch (error) {
      res.status(500)
      logger.error(`GET /hh/pdf \n${error}`)
      res.send(error)
   }
})

module.exports = router