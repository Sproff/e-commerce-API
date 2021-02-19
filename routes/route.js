const express = require('express');
const {
  welcomePage,
  getAllProductsList,
  getParticularProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.route('/').get(welcomePage);

router.route('/product').get(getAllProductsList).post(createProduct);

router
  .route('/product/:slug')
  .get(getParticularProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
