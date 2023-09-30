const express = require('express');
const { saveJsonFile, getAllJsonData } = require('../../libs/jsonLibrary');
const router = express.Router();
const path = require('path');
const apiWhatsapp = require('./api/apiWhatsapp');

const dataDir = path.join(__dirname, 'data');

router.get('/', async (req, res) => {
   const candidate = await getAllJsonData(dataDir)
   res.send(candidate)
})
router.post('/', async (req, res) => {
   const date = Date.now()
   const newPhone = { ...req.body, isSend: req.body.messages.map(() => false), timeCreate: date }
   saveJsonFile(newPhone, dataDir, date)
   
   res.send('OK')
});
router.get('/chat', async (req, res) => {
   try {
      const number = req.query.number
      const messages = await apiWhatsapp.getChat(number)
      res.send(messages)
   } catch (error) {
      res.status(500)
      res.send(error)
   }
});


module.exports = router