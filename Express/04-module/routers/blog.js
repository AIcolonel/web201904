/*
* @Author: Chen
* @Date:   2019-11-07 10:40:12
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-07 10:43:07
*/
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => res.send('blogs response get ...'))
router.post('/', (req, res) => res.send('blogs response post ...'))
router.put('/', (req, res) => res.send('blogs response put ...'))
router.delete('/', (req, res) => res.send('blogs response delete ...'))

module.exports = router