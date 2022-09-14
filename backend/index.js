const express = require('express')
const cors = require('cors')
const conn = require('./database/conn')
const app = express()
const logger = require('morgan')

/* Import Routes */
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

/* Configurar JSON response */
app.use(express.json())

/* Cors */
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(logger('dev'))
/* Public folder */
app.use(express.static('public'))

/* Routes */
app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)
app.listen(5000)