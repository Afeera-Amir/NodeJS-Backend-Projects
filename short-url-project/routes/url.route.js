const express = require('express')
const router = express.Router()
const {handleCreateNewURL, handleGetURLclicks} = require('../controllers/urlController')

router.post('/', handleCreateNewURL)
router.get('/analytics/:shortID', handleGetURLclicks)

module.exports = router