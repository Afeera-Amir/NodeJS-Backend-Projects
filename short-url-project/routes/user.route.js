const express = require('express')
const { handleSignupUser, handleLoginUser } = require('../controllers/userController')
const router = express.Router()

router.post('/',handleSignupUser)
router.post('/login', handleLoginUser)

module.exports = router