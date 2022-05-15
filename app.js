const config = require('./utils/config')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const companiesRouter = require('./controllers/companies')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

morgan.token('body', req => {
  const body = JSON.stringify(req.body)
  if(Object.keys(body).length > 2) return body
})

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
}

app.get('/info', (request, response) => {
  response.send(`
    <h1>Tique Smart Orders</h1>
    <em>Powered by Didro's Apps</em>
    <p><u>${new Date()}</u></p>
  `)
})

app.use('/api/companies', companiesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app