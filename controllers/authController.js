const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const secretKey = process.env.JWT_SECRET_KEY || 'defaultSecretKey'

// 登陆路由
exports.login = async (req, res) => {
    const {userName: username, passWord: password} = req.body

    try {
        // 在数据库中查找用户
        const user = await User.findOne({where: {username}})

        if (!user) {
            return res.status(401).json({code: 401, message: '暂未注册该用户'})
        }

        // 校验密码
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({code: 401, message: '用户名或密码错误'})
        }

        // 生成 JWT
        const token = jwt.sign({userId: user.id, username: user.username}, secretKey, {expiresIn: '1h'});

        if (!user.token) {
            // 检查密码是否匹配
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({message: '用户名或密码不正确'});
            }

            // 生成 JWT
            const token = jwt.sign({userId: user.id, username: user.username}, secretKey, {expiresIn: '1h'});

            // 将生成的 token 存储到数据库
            user.token = token;
            await user.save();

            // 返回 JWT 给客户端
            return res.status(200).json({code: 200, message: '登陆成功', data: {token}});
        } else {
            // 如果用户已经有 token，表示不是第一次登录，直接验证密码
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({message: '用户名或密码不正确'});
            }

            // 返回之前存储的 token 给客户端
            return res.status(200).json({code: 200, message: '登陆成功', data: {token: user.token}});
        }
    } catch (error) {
        console.error('登陆出错', error)
        res.status(500).json({code: 500, message: `服务器错误${error.message}`})
    }
}
