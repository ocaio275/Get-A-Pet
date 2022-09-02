const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
/*Helpers */
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmPassword } = req.body

        //Validações
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória' })
            return
        }
        if (!confirmPassword) {
            res.status(422).json({ message: ' A confirmação de senha é obrigatória' })
            return
        }
        if (password !== confirmPassword) {
            res.status(422).json({ message: 'A senha e a confirmação precisam ser iguais!' })
            return
        }

        //Verificar se o usuário exite
        const userExists = await User.findOne({ email: email })

        if (userExists) {
            res.status(422).json({ message: 'E-mail já cadastrado! Por favor utilize outro endereço de e-mail' })
            return
        }

        //Criar a senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //criar usuário
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error })
        }

    }

    static async login(req, res) {

        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória' })
            return
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(404).json({ message: 'Não há usuário cadastrado com esse e-mail' })
            return
        }

        //verificar se a senha é a mesma do banco

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ message: 'Senha inválida' })
            return
        }

        await createUserToken(user, req, res)
    }
    
    static async checkUser(req, res){

        let currentUser
        
        if(req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossascret')
            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
        }else{
            currentUser = null
        }
        res.status(200).send(currentUser)
    }
}