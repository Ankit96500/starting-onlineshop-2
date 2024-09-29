const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

// normal route
router.get('/products', shopController.getProducts);

// add dynamic route
router.get('/products/:productId',shopController.getProduct);


router.get('/cart', shopController.getCart);

// handel post request

router.post('/cart',shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
