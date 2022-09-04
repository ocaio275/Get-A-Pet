require('dotenv').config()
const mongoose = require('mongoose')


async function main(){
    await mongoose.connect(process.env.DATABASE)
    console.log('conectado ao Mongo')
}

main().catch((err) => console.log(err))

module.exports = mongoose