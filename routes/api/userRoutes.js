const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')

// 新建用户的路由
router.post('/createUser', userController.createUser)

// 获取所有用户的路由
router.get('/getAllUser', userController.getAllUsers)

module.exports = router
