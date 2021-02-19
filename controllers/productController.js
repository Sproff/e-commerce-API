const Product = require('../models/products');
const slugify = require('slugify');

// Welcome
const welcomePage = (req, res, next) => {
  try {
    res.send(
      'Hey buddy! Feel free to create stuffs with this API. Try /product to get all products.'
    );
  } catch (error) {
    next(error);
  }
};

// Get the list of products
const getAllProductsList = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: 'success',
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a particular product
const getParticularProduct = async (req, res, next) => {
  try {
    const {slug} = req.params;
    const product = await Product.findOne({slug});

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Post/Create a particular product
const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    data.slug = slugify(data.name, {lower: true});
    const product = await Product.create(data);

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update a particular product
const updateProduct = async (req, res, next) => {
  try {
    const {slug} = req.params;
    const data = req.body;

    const product = await Product.findOneAndUpdate({slug}, data, {
      new: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a particular product
const deleteProduct = async (req, res, next) => {
  try {
    const {slug} = req.params;
    const product = await Product.findOneAndDelete({slug});

    if (!product) {
      res.status(404).json({status: 'error', message: 'Product not found'});
      return;
    }

    res.status(201).json({
      status: 'success',
      message: 'Product has been deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  welcomePage,
  getAllProductsList,
  getParticularProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
