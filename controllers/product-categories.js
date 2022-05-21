const productCategoriesRouter = require('express').Router()
const ProductCategory = require('../models/product-category')
const Company = require('../models/company')

productCategoriesRouter.get('/', async (request, response) => {
  const productCategories = await ProductCategory.find({})
  response.json(productCategories)
})

productCategoriesRouter.get('/:id', async (request, response) => {
  const productCategory = await ProductCategory
    .findById(request.params.id)
    .populate('products', { name: 1, description: 1, price: 1, discount: 1 })
    
  if(productCategory) {
    response.json(productCategory.toJSON())
  } else {
    response.status(404).end()
  }
})

productCategoriesRouter.post('/', async(request, response) => {
  const body = request.body
  const company = await Company.findById(body.companyId)

  const productCategory = new ProductCategory({
    description: body.description,
    company: company._id
  })

  const savedProductCategory = await productCategory.save()
  company.productCategories = company.productCategories.concat(savedProductCategory._id)
  await company.save()
  
  response.status(201).json(savedProductCategory)
})

module.exports = productCategoriesRouter