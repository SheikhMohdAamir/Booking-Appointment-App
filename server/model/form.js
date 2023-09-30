const {Sequelize,DataTypes} = require('sequelize')
const sequelize=require('../database/sql')

const table = sequelize.define('data',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
    })

module.exports = table;