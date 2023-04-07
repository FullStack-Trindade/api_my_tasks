const Task = require('../../models/task')

async function deleteTask (request, response)  {
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
}

module.exports = deleteTask