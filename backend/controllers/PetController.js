const Pet = require('../models/Pet')

//Middlewares
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId


module.exports = class PetController {
    static async getAll(req, res) {

        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({ pets: pets })

    }
    static async create(req, res) {
        const { name, age, weight, color } = req.body

        const images = req.files

        const available = true

        //upload de imagens

        //validações

        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório" })
            return
        }
        if (!age) {
            res.status(422).json({ message: "A idade é obrigatória" })
            return
        }
        if (!weight) {
            res.status(422).json({ message: "O peso é obrigatório" })
            return
        }
        if (!color) {
            res.status(422).json({ message: "A cor é obrigatória" })
            return
        }
        if (images.length === 0) {
            res.status(422).json({ message: "A imagem é obrigatória" })
            return
        }

        //get User

        const token = getToken(req)
        const user = await getUserByToken(token)
        //Criação do obj Pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()
            res.status(201).json({ message: "Pet cdastrado com sucesso", newPet })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
    static async getAllUserPets(req, res) {

        //pegar dados do usuário pelo token

        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

        res.status(200).json({ pets })
    }

    static async getAllUserAdoptions(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')
        res.status(200).json({ pets })
    }

    static async getPetById(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Id inválido" })
            return
        }

        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            res.status(404).json({ message: "Pet não encontrado" })
            return
        }

        res.status(200).json({ pet })
    }

    static async removePetById(req, res) {
        const id = req.params.id

        //verificar se o ID é valido
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Id inválido" })
            return
        }

        const pet = await Pet.findOne({ _id: id })

        //Verificar se o pet está cadastrado 
        if (!pet) {
            res.status(404).json({ message: "Pet não encontrado" })
            return
        }

        //verificar se o usuário logado registrou o pet

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: "Houver um problema em processar sua solicitação, tente novamente mais tarde!" })
            return
        }

        await Pet.findByIdAndRemove(id)

        res.status(200).json({ message: "Pet removido com sucesso" })
    }

    static async updatePet(req, res) {
        const id = req.params.id

        const { name, age, weight, color, available } = req.body

        const images = req.files

        const updateData = {}

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Id inválido" })
            return
        }

        const pet = await Pet.findOne({ _id: id })
        if (!pet) {
            res.status(404).json({ message: "Pet não encontrado" })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: "Houver um problema em processar sua solicitação, tente novamente mais tarde!" })
            return
        }


        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório" })
            return
        } else {
            updateData.name = name
        }
        if (!age) {
            res.status(422).json({ message: "A idade é obrigatória" })
            return
        } else {
            updateData.age = age
        }
        if (!weight) {
            res.status(422).json({ message: "O peso é obrigatório" })
            return
        } else {
            updateData.weight = weight
        }
        if (!color) {
            res.status(422).json({ message: "A cor é obrigatória" })
            return
        } else {
            updateData.color = color
        }

        if (images.length === 0) {
            res.status(422).json({ message: "A imagem é obrigatória" })
            return
        } else {
            updateData.images = []
            images.map((image) => {
                updateData.images.push(image.filename)
            })
        }
        await Pet.findByIdAndUpdate(id, updateData)

        res.status(200).json({ message: "Pet atualizado com sucesso" })
    }

    static async schedule(req, res) {
        const id = req.params.id

        //verificar se o ObjectId é valido
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Id inválido" })
            return
        }

        //Verificar se o Pet existe no banco
        const pet = await Pet.findOne({ _id: id })
        if (!pet) {
            res.status(404).json({ message: "Pet não encontrado" })
            return
        }

        //Verificar se o usuário é dono do Pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.equals(user._id)) {
            res.status(422).json({ message: "Você não pode agendar um visita com o seu próprio Pet" })
            return
        }


        //verificar se o usuário já agendou uma visita
        if (pet.adopter) {
            if (pet.adopter._id.equals(user._id)) {
                res.status(422).json({ message: "Você já agendou uma visita para esse Pet" })
                return
            }
        }

        //adicionar o usuário ao pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({ message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone: ${pet.user.phone}` })
    }

    static async concludeAdoption(req, res){
        
    }
}