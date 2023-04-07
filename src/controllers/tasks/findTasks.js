const Task = require('../../models/task')

async function findTasks (request, response)  {
    try {
        const tasks = await Task.findAll({
            where: {
            user_id: request.body.userId
        }})
        response.json(tasks)
    } catch (error) {
        response.status(500).json({ message: 'Não conseguimos processar sua solicitação.' })
    }
}

module.exports = findTasks