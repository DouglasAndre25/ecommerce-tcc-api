require('dotenv/config')

const express = require('express')
const cors = require('cors')
const routes = require('./routes')

require('./app/models')

const app = express()

app.set('trust proxy', true)
app.use(cors())
app.use(express.json())
app.use(routes)

module.exports = app
