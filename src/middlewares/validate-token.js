const jwt = require('jsonwebtoken')
const User = require('../models/user')

function validateToken(request, response, next) {
    // validar se tem token no Header da requisição
    console.log(request.headers.authorization)
    const token = request.headers.authorization

    console.log(token)

    // verificar se token pelo menos está presente
    if (!token || token === 'Bearer') {
        return response.status(403).json({ message: 'Token não presente' })
    }

    const tokenJwt = token.slice(7)

    jwt.verify(tokenJwt, 'MINHA_CHAVE_SECRETA', (error, conteudoDoToken) => {
        if (error) {

            if (error.name === "TokenExpiredError") {
                return response.status(403).json({ message: 'Token Expirado' })
            } else if (error.name === "JsonWebTokenError") {
                return response.status(403).json({ message: 'Token inválido' })
            }

        } else {
            
            next()
        }
    })

}

module.exports = validateToken