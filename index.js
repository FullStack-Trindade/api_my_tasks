require('dotenv').config()
const express = require('express');

const connection = require('./src/database');

const log = require('./src/middlewares/log');
const hello = require('./src/middlewares/hello');
const validateNewUser = require('./src/middlewares/validate-new-user');
const validateToken = require('./src/middlewares/validate-token');

const createTask = require('./src/controllers/tasks/createTask');
const findTasks = require('./src/controllers/tasks/findTasks');
const deleteTask = require('./src/controllers/tasks/deleteTask');
const updateTask = require('./src/controllers/tasks/updateTask');

const createUser = require('./src/controllers/users/createUser');
const createLogin = require('./src/controllers/users/createLogin');

const app = express()
app.use(express.json()) //obrigatório

app.use(hello)
app.use(log)

connection.authenticate()
connection.sync({ alter: true })
console.log('Connection has been established successfully.');

app.get('/', (request, response) => {
    response.json({ messagem: "Bem vindo" })
})

app.post('/tarefas', validateToken, createTask)
app.get('/tarefas', validateToken, findTasks)
app.delete('/tarefas/:id', validateToken, deleteTask)
app.put('/tarefas/:id', validateToken, updateTask)

app.post('/users', validateNewUser, createUser)
app.post('/users/login', createLogin )

app.listen(3333, () => console.log("Aplicação online"))

        // "" false
        // 0 false
        // false false
        // null false
        // undefined false


