/*
* @Author: Chen
* @Date:   2019-11-07 10:40:12
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-07 10:41:28
*/
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => res.send('users response get ...'))
router.post('/', (req, res) => res.send('users response post ...'))
router.put('/', (req, res) => res.send('users response put ...'))
router.delete('/', (req, res) => res.send('users response delete ...'))

module.exports = router