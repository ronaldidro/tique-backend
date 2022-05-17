const productsRouter = require('express').Router()
const Product = require('../models/product')

productsRouter.get('/', async (request, response) => {
  const products = await Product.find({})
  response.json(products)
})

productsRouter.get('/:id', async (request, response) => {
  const product = await Product.findById(request.params.id)
    
  if(product) {
    response.json(product.toJSON())
  } else {
    response.status(404).end()
  }
})

productsRouter.post('/', async(request, response) => {
  const product = new Product(request.body)
  const savedProduct = await product.save()
  response.status(201).json(savedProduct)
})

module.exports = productsRouter