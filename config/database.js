const { Sequelize } = require('sequelize')

const dataBaseName = 'guanwang'
const userName = 'root'
const password = 'wjzsz964'
const sequelize = new Sequelize(dataBaseName, userName, password, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize
