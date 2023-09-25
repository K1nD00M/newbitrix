const express = require('express');
const { saveJsonFile, getAllJsonData } = require('../../libs/jsonLibrary');
const router = express.Router();
const path = require('path')

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

module.exports = router