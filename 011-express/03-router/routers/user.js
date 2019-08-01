var express = require('express');
var router = express.Router();


router.get('/', (req, res) => res.send('get user response data .....'));
router.post('/', (req, res) => res.send('post user response data .....'));
router.put('/', (req, res) => res.send('put user response data .....'));
router.delete('/', (req, res) => res.send('delete user response data .....'));


module.exports = router;