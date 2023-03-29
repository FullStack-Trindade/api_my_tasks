const { Sequelize } = require('sequelize')
const connection = require('../database')

const Task = connection.define('tasks', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true, 
        allowNull:false,
        primaryKey:true
     },
     name: {
        type: Sequelize.STRING,
        allowNull: false
     },
     description: {
        type: Sequelize.STRING
     }
} )

module.exports = Task
