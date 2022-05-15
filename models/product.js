const mongoose = require('mongoose')

var SchemaTypes = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    set: function (v) { return Math.round(v) },
    required: true
  },
  discount: {
    type: SchemaTypes.Decimal128,
    default: 0.0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory'
  }
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Producto', productSchema)