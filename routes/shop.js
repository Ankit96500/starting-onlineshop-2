import path from 'path';

import { Router } from 'express';

import { getIndex, getProducts, getProduct, getCart, postCart, getOrders, getCheckout } from '../controllers/shop.js';

const router = Router();

router.get('/', getIndex);

// normal route
router.get('/products', getProducts);

// add dynamic route
router.get('/products/:productId',getProduct);


router.get('/cart', getCart);

// handel post request

router.post('/cart',postCart);

router.get('/orders', getOrders);

router.get('/checkout', getCheckout);

export default router;
