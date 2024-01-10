function authorizeAdmin(req,res,next) {
    // 从身份验证中间件中获取用户信息中检查是又有admin权限
    const user = req.user

    if (user && user.role === 'admin') {
        next()
    } else {
        res.status(403).json({code: 403, message: '没有权限访问该资源'})
    }
}

module.exports = {
    authorizeAdmin
}
