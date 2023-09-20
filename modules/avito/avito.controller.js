const express = require('express');
const router = express.Router();
const logger = require('../../libs/logger');
const avitoMiddleware = require('./avito.middleware');
const { avitoAPI } = require('./avito.api');
const tokenObject = require('./avito.access')

// Получить сообщения
router.get('/messages', async (req, res) => {
   try {
      const token = tokenObject.getValue()
      const messagesInAvito = await avitoAPI.getMessages(token)
      const messages = messagesInAvito.map(item => avitoMiddleware.updateMessage(item))
      logger.info(`GET /avito/messages`)

      res.send(messages)
   } catch (error) {
      logger.error(`GET /avito/messages \n ${error}`)
      res.status(500)
      res.send('Error')
   }
})

// Получить чат
router.get('/messages/:chatId', async (req, res) => {
   const chatId = req.params.chatId
   try {
      const token = tokenObject.getValue()
      const chat = await avitoAPI.getChat(token, chatId)

      logger.info(`GET /avito/messages/${chatId}`)
      res.send(chat)
   } catch (error) {
      logger.error(`GET /avito/messages/:${chatId} \n ${error}`)
      res.status(500)
      res.send('Error')
   }
})

// Отправить сообщение
router.post('/messages/:chatId', async (req, res) => {
   const chatId = req.params.chatId
   try {
      const token = tokenObject.getValue()
      const message = req.body.message
      await avitoAPI.sendMessage(token, chatId, message)
      const chat = await avitoAPI.getChat(token, chatId)

      logger.info(`POST /avito/messages/${chatId}`)
      res.send(chat)
   } catch (error) {
      logger.error(`POST /avito/messages/:chatId \n ${error}`)
      res.status(500)
      res.send('Error')
   }
})

// Прочить сообщение
router.post('/messages/read/:chatId', async (req, res) => {
   const chatId = req.params.chatId
   try {
      const token = tokenObject.getValue()
      const resAvito = await avitoAPI.readMessage(token, chatId)

      logger.info(`POST /avito/messages/read/${chatId}`)
      if (resAvito.status === 200) {
         res.send({ status: 'OK' })
      }
      else {
         res.send({ status: 'Error' })
      }
   } catch (error) {
      logger.error(`POST /avito/messages/read/:${chatId} \n ${error}`)
      res.status(500)
      res.send({ status: 'Error' })
   }
})

module.exports = router