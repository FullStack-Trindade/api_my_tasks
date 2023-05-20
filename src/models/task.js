const { Sequelize } = require('sequelize')
const connection = require('../database')
const User = require('./user')

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateTaskEntries:
 *      type: object
 *      required: true
 *        - name
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          default: Douglas
 */
const Task = connection.define('task', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false
   },
   description: {
      type: Sequelize.STRING
   },
   user_id: {
      type: Sequelize.INTEGER
   }
})

Task.belongsTo(User)

//Task.belongsTo(User, { foreignKey: 'usuario_id' }); muda nome da coluna criada

module.exports = Task