const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET_KEY || 'defaultSecretKey'

function authenticateUser(req, res, next) {
    // 从请求中获取token
    const token = req.headers.authorization.split(' ')[1]

    // 验证token
    jwt.verify(token, secretKey, (err, user) => {
        if (err)  return res.status(403).json({code:403, message: '身份验证失败'})
        req.user = user
        next()
    })
}

module.exports = {
    authenticateUser
}
