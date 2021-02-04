const express = require('express');
const Product = require('./models/products');
const router = express.Router();

// Get the list of products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();

    res.send(products);
  } catch (error) {
    next(error);
  }
});

// Get a particular product
router.get('/product/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const product = await Product.findOne({_id: id});

    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Post/Create a particular product
router.post('/product', async (req, res, next) => {
  try {
    const data = req.body;
    const product = await Product.create(data);

    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Update a particular product
router.patch('/product/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const data = req.body;

    const product = await Product.findOneAndUpdate({_id: id}, data, {
      new: true,
    });

    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Delete a particular product
router.delete('/product/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const data = req.body;

    const product = await Product.findOneAndDelete({_id: id}, data, {
      new: true,
    });

    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
