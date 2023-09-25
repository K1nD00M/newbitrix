const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
   const data = AuthService.getToken()
   res.send(data)
});
router.post('', (req, res) => {
   const data = AuthService.auth()
   res.send(data)
});

module.exports = router