const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  placeService: {
    type: String,
    required: true
  },
  attentionSchedule: {
    type: Array,
    default: [],
    required: true
  },
  socialNetworks: {
    type: Array,
    default: []
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  productCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory'
    }
  ]
})

companySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

companySchema.plugin(uniqueValidator)

module.exports = mongoose.model('Company', companySchema)
