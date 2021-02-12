const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.route('/').get(productController.welcomePage);

router
  .route('/product')
  .get(productController.getAllProductsList)
  .post(productController.createProduct);

router
  .route('/product/:slug')
  .get(productController.getParticularProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
