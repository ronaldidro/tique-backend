const mongoose = require('mongoose')

var SchemaTypes = mongoose.Schema.Types;

const orderDetailSchema = new mongoose.Schema({
  items: {
    type: Number,
    required: true
  },
  amount: {
    type: SchemaTypes.Decimal128,
    required: true
  },
  discount: {
    type: SchemaTypes.Decimal128,
    default: 0.0
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
})

orderDetailSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('OrderDetail', orderDetailSchema)