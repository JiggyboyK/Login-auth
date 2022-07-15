const express = require ('express')
const router = express.Router()
const { signUp, loginUser, getMe} = require('../controller/userController')

const { protect } = require ('../middleware/authMiddleware')

router.post('/', signUp)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router 