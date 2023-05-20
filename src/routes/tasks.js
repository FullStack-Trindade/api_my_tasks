const Router = require('express');
const validateToken = require('../middlewares/validate-token');
const createTask = require('../controllers/tasks/createTask');
const findTasks = require('../controllers/tasks/findTasks');
const deleteTask = require('../controllers/tasks/deleteTask');
const updateTask = require('../controllers/tasks/updateTask');

const taskRoutes = new Router();

/**
 * @openapi
 * /tasks:
 *  post:
 *    tags:
 *        - Task
 *    summary: Criar nova tarefa
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateTaskEntries'
 *    responses:
 *      201:
 *        description: Criado com sucesso 
 *      400:
 *        description: Nome/descrição obrigatório
 *      409:
 *        description: Tarefa já existente
 *      500:
 *        description: Error servidor
 */

taskRoutes.post('/', createTask)

taskRoutes.get('/', findTasks)
taskRoutes.delete('/:id', deleteTask)
taskRoutes.put('/:id', updateTask)

module.exports = taskRoutes