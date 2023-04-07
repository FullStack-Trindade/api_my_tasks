const Task = require('../../models/task')

async function createTask(request, response) {
    try {
       
        const tarefa = {
            name: request.body.name,
            description: request.body.description,
            user_id: request.body.userId
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
        response.status(500).json({ message: 'Não conseguimos processar sua solicitação.' })
    }
}

module.exports = createTask