const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')
const authenticationMiddleware = require('../../middlewares/authentication')
const authorizationMiddleware = require('../../middlewares/authorization')

// 登陆路由
router.post('/login', authController.login)

module.exports = router
