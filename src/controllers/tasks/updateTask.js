const Task = require('../../models/task')


async function updateTask (request, response) {

    try {

        const taskInDatabase = await Task.findByPk(request.params.id) // select from tasks where id = ?

        if (!taskInDatabase) {
            return response
                .status(404)
                .json({ message: 'Tarefa não encontrado' })
        }

        taskInDatabase.name = request.body.name || taskInDatabase.name
        taskInDatabase.description = request.body.description || taskInDatabase.description

        await taskInDatabase.save() // UPDATE 

        response.json(taskInDatabase)

    } catch (error) {
        response.status(500).json({ message: 'Não conseguimos processar sua solicitação.' })
    }

}

module.exports = updateTask