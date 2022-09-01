const express = require('express')
const cors = require('cors')
const conn = require('./database/conn')
const app = express()

/* Import Routes */
const UserRoutes = require('./routes/UserRoutes')


/* Configurar JSON response */
app.use(express.json())

/* Cors */
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

/* Public folder */
app.use(express.static('public'))

/* Routes */
app.use('/users', UserRoutes)

app.listen(5000)