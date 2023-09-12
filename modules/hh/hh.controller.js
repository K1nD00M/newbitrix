const express = require('express');
const HHService = require('./hh.service');
const router = express.Router();
const logger = require('../../libs/logger');
const hhApi = require('./hh.api');

router.get('/query', async (req, res) => {
   const code = req.query.code
   try {
      const result = await HHService.getJwtInCode(code)
      logger.info('GET /hh/query')
      res.redirect('https://vodovoz.bitrix24.ru/marketplace/app/169/')
   } catch (error) {
      res.status(500)
      logger.error(`GET /hh/query \n${error}`)
      res.send('Возникла ошибка при обработке запроса. Повторите попытку')
   }
});
router.get('/messages/:id', async (req, res) => {
   const id = req.query.id
   try {
      const messages = await HHService.getMessages(token, id)
      logger.info('GET /hh/messages')
      res.json(messages)
   } catch (error) {
      res.status(500)
      logger.error(`GET /hh/messages \n${error}`)
      res.send('Возникла ошибка при обработке запроса. Повторите попытку')
   }
});
router.post('/messages/:id', async (req, res) => {
   const id = req.query.id
   const message = req.body.message
   try {
      const data = await hhApi.sendMessage(token, message, id)
      logger.info(`POST /messages/${id}`)
      
      res.json(data)
   } catch (error) {
      res.status(500)
      logger.error(`POST /messages/${id} \n${error}`)
      res.send('Возникла ошибка при обработке запроса. Повторите попытку')
   }
})
router.get('/:url', async (req, res) => {
   const url = req.query.url
   try {
      const data = await hhApi.url(url)
      logger.info(`GET /hh/${url}`)
      
      res.send(data)
   } catch (error) {
      res.status(500)
      logger.error(`GET /hh/${url} \n${error}`)
      res.send('Возникла ошибка при обработке запроса. Повторите попытку')
   }
})
router.get('/pdf/:url', async (req, res) => {
   const url = req.query.url
   try {
      const data = await hhApi.getPdf(url)
      logger.info(`GET /hh/pdf/${url}`)
      
      res.send(data)
   } catch (error) {
      res.status(500)
      logger.error(`GET /hh/pdf/${url} \n${error}`)
      res.send('Возникла ошибка при обработке запроса. Повторите попытку')
   }
})

module.exports = router