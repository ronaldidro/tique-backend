const productsRouter = require('express').Router()
const Product = require('../models/product')
const ProductCategory = require('../models/product-category')

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
  const body = request.body
  const { name, description, price, discount, categoryId } = body
  const productCategory = await ProductCategory.findById(categoryId)

  const product = new Product({
    name,
    description,
    price,
    discount,
    category: productCategory._id
  })

  const savedProduct = await product.save()
  productCategory.products = productCategory.products.concat(savedProduct._id)
  await productCategory.save()

  response.status(201).json(savedProduct)
})

module.exports = productsRouter