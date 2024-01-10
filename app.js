const express = require('express')
const sequelize = require('./config/database')
const userRoutes = require('./routes/api/userRoutes')
const authRoutes = require('./routes/api/authRoutes')

const app = express()
// 设置端口
const port = process.env.PORT || 3000

sequelize.sync({force: false})
    .then(() => {
        console.log("数据库synced")
    })
    .catch(error => {
        console.error("数据库synced错误", error)
    })

// 中间件配置
app.use(express.json()) // 解析JSON请求体
app.use(express.urlencoded({extended: true}))

app.use('/api', userRoutes)
app.use('/api', authRoutes)

app.listen(port, () => {
    console.log(`服务运行在${port}端口`)
})
