require('dotenv').config()
const jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {
    //criando um Token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.SECRET //Criar dps uma secret em variavel de ambiente
    )

    //retornando um token
    res.status(200).json({
        message: 'Você está autenticado',
        token: token,
        userId: user._id
    })
}

module.exports = createUserToken