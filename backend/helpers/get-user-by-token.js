const jwt = require('jsonwebtoken')

const User = require('../models/User')

//Função para pegar usuário pelo token
const getUserbyToken = async (token) =>{

    if(!token){
        return res.status(401).json({message: 'Acesso negado'})
    }

    const decoded = jwt.verify(token, 'nossascret')

    const userId = decoded.id

    const user = await User.findOne({_id: userId})

    return user
}

module.exports = getUserbyToken