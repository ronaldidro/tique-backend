const productCategoriesRouter = require('express').Router()
const ProductCategory = require('../models/product-category')

productCategoriesRouter.get('/', async (request, response) => {
  const productCategories = await ProductCategory.find({})
  response.json(productCategories)
})

productCategoriesRouter.get('/:id', async (request, response) => {
  const productCategory = await ProductCategory.findById(request.params.id)
    
  if(productCategory) {
    response.json(productCategory.toJSON())
  } else {
    response.status(404).end()
  }
})

productCategoriesRouter.post('/', async(request, response) => {
  const productCategory = new ProductCategory(request.body)
  const savedProductCategory = await productCategory.save()
  response.status(201).json(savedProductCategory)
})

module.exports = productCategoriesRouter