const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function createLogin(request, response) {

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
                id: userInDatabase.id,
                name: userInDatabase.name
            },
            process.env.CHAVE_DO_TOKEN,
            {
                expiresIn: '1h'
            }
        )

        response.json({ name: userInDatabase.name, token: token })

    } catch (error) {
        response.status(500).json({ message: 'Não conseguimos processar sua solicitação.' })
    }
}

module.exports = createLogin