const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const connection = require('./src/database');

const Task = require('./src/models/task')
const User = require('./src/models/user')

const app = express()

app.use(express.json()) //obrigatório


connection.authenticate()
connection.sync({ alter: true })
console.log('Connection has been established successfully.');

app.get('/', (request, response) => {
    console.log("Entrei aqui")
    response.json({ messagem: "Bem vindo" })
})

// Cadastrar um nova tarefa
app.post('/tarefas', async (request, response) => {
    try {
        const tarefa = {
            name: request.body.name,
            description: request.body.description
        }

        if (!tarefa.name || !tarefa.description) {
            return response
                .status(400)
                .json({ message: 'Nome/Descrição é obrigatório' })
        }

        const taskInDatabase = await Task.findOne(
            { where: { name: tarefa.name } }
        ) // SELEC FROM taks where name = ''

        if (taskInDatabase) {
            return response
                .status(400)
                .json({ message: 'Já existe uma tarefa com esse nome' })
        }

        const newTask = await Task.create(tarefa)

        response.status(201).json(newTask) // recomendada
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: 'Não conseguimos processar sua solicitação.' })
    }
})

app.get('/tarefas', async (request, response) => {
    try {
        const tasks = await Task.findAll()
        response.json(tasks)
    } catch (error) {
        response.status(500).json({ message: 'Não conseguimos processar sua solicitação.' })
    }
})

app.delete('/tarefas/:id', async (request, response) => {

    try {

        await Task.destroy({
            where: {
                id: request.params.id
            }
        })

        response.status(200).json({ message: 'deletado com sucesso' })
        //response.status(204).json()
        // delete from tasks where id = id que recebi

    } catch (error) {
        response.status(500).json({ message: 'Não conseguimos processar sua solicitação.' })
    }


})

app.put('/tarefas/:id', async (request, response) => {

    try {

        const taskInDatabase = await Task.findByPk(request.params.id) // select from tasks where id = ?

        if (!taskInDatabase) {
            return response
                .status(404)
                .json({ message: 'Tarefa não encontrado' })
        }

        taskInDatabase.name = request.body.name || taskInDatabase.name
        taskInDatabase.description = request.body.description || taskInDatabase.description

        console.log(taskInDatabase)

        await taskInDatabase.save() // UPDATE 

        response.json(taskInDatabase)

    } catch (error) {
        console.log(error)
        response.status(500).json({ message: 'Não conseguimos processar sua solicitação.' })
    }

})


app.post('/users', async (request, response) => {
    try {

        const userInDatabase = await User.findOne({
            where: {
                cpf: request.body.cpf
            }
        })

        if (userInDatabase) {
            return response
                .status(409)
                .json({ message: 'Já existe um usuário com essa conta' })
        }


        const hash = await bcrypt.hash(request.body.password, 10)

        const newUser = {
            name: request.body.name,
            cpf: request.body.cpf,
            password: hash
        }


        // criptografar a senha 

        const user = await User.create(newUser)

        const { _password, ...userData } = user.toJSON

        response.status(201).json(userData)

    } catch (error) {
        response.status(500).json({ message: 'Não conseguimos processar sua solicitação.' })
    }
})

app.post('/users/login', async (request, response) => {

    try {
        const userInDatabase = await User.findOne({
            where: {
                cpf: request.body.cpf
            }
        })

        // verifica cpf
        if (!userInDatabase) {
            return response.status(404).json({ message: 'Cpf ou senha incorretos' })
        }

        const passwordIsValid = await bcrypt.compare(request.body.password, userInDatabase.password)

        // verifica se a senha está correta 
        if (!passwordIsValid) {
            return response.status(404).json({ message: 'Crendeciais incorreta[password]' })
        }

        const token = jwt.sign(
            {
                id: userInDatabase.id
            },
            'MINHA_CHAVE_SECRETA',
            {
                expiresIn: '1h'
            }
        )
        
        response.json({ name: userInDatabase.name, token: token })

    } catch (error) {
        response.status(500).json({ message: 'Não conseguimos processar sua solicitação.' })
    }
})

app.listen(3333, () => console.log("Aplicação online"))


        // "" false
        // 0 false
        // false false
        // null false
        // undefined false


