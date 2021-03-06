const companiesRouter = require('express').Router()
const Company = require('../models/company')

companiesRouter.get('/', async (request, response) => {
  const companies = await Company.find({}, 'name address placeService')
  response.json(companies)
})

companiesRouter.get('/:id', async (request, response) => {
  const company = await Company.findById(request.params.id).populate({
    path: 'productCategories',
    select: 'description',
    populate: {
      path: 'products',
      select: 'name description price discount'
    }
  })

  if (company) {
    response.json(company.toJSON())
  } else {
    response.status(404).end()
  }
})

companiesRouter.post('/', async (request, response) => {
  const company = new Company(request.body)
  const savedCompany = await company.save()
  response.status(201).json(savedCompany)
})

module.exports = companiesRouter
