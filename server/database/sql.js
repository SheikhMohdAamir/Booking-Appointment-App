const {Sequelize} = require('sequelize')
const sequelize= new Sequelize('database','root','helloworld',{host:'localhost',dialect:'mysql'})

module.exports = sequelize