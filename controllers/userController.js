const User = require('../models/User')
const bcrypt = require('bcryptjs')

// 创建新用户
exports.createUser = async (req, res) => {
    const {userName: username, passWord: password} = req.body

    // 检查用户名是否已存在
    const existingUser = await User.findOne({where: {username}})

    if (existingUser && existingUser instanceof User) {
        return res.status(400).json({code: 400, message: '用户名已存在'})
    }
    if (username == null) {
        return res.status(500).json({code: 500, message: '用户名未填写'})
    } else if (password == null) {
        return res.status(500).json({code: 500, message: '密码未填写'})
    } else {
        const hashedPassword = await bcrypt.hash(password, 10)
        try {
            const newUser = await User.create({username, password:hashedPassword})
            return res.status(201).json({code: 200, message: ' 新建用户成功'})
        } catch (error) {
            return res.status(500).json({code: 500, message: error.message})
        }
    }
}

// 获取所有用户
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
