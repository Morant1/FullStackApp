const express = require('express')
const {getEventis, getEventi, deleteEventi, updateEventi,addEventi} = require('./eventi.controller')
const router = express.Router()



router.get('/', getEventis)
router.get('/:id', getEventi)
router.put('/:id', updateEventi)
router.post('/', addEventi)
router.delete('/:id', deleteEventi)

module.exports = router
