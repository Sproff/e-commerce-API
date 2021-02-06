const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  desc: {
    type: String,
    required: [true, "Field can't be blank"],
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
  },
  price: {
    type: Number,
    required: true,
  },
  saleprice: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
