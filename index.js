require('dotenv').config()
const express = require('express');

const connection = require('./src/database');

const log = require('./src/middlewares/log');
const hello = require('./src/middlewares/hello');
const validateNewUser = require('./src/middlewares/validate-new-user');

const createUser = require('./src/controllers/users/createUser');
const createLogin = require('./src/controllers/users/createLogin');
const taskRoutes = require('./src/routes/tasks');
const { swaggerDocs } = require('./swagger');

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

app.use('/tasks', taskRoutes)

app.post('/users', validateNewUser, createUser)
app.post('/users/login', createLogin )

swaggerDocs(app, 3333);

app.listen(3333, () => console.log("Aplicação online"))

        // "" false
        // 0 false
        // false false
        // null false
        // undefined false


