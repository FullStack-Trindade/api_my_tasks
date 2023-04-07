const {Router} = require('express')

const validateToken = require('../middlewares/validate-token')

const createTask = require('../controllers/tasks/createTask')
const findTasks = require('../controllers/tasks/findTasks')
const deleteTask = require('../controllers/tasks/deleteTask')
const updateTask = require('../controllers/tasks/updateTask')

const tasksRoutes = new Router()

tasksRoutes.post('/tarefas', validateToken, createTask)
tasksRoutes.get('/tarefas', validateToken, findTasks)
tasksRoutes.delete('/tarefas/:id', validateToken, deleteTask)
tasksRoutes.put('/tarefas/:id', validateToken, updateTask)

module.exports = tasksRoutes
