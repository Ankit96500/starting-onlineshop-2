import path from 'path';

import { Router } from 'express';

import { getAddProduct, getProducts, postAddProduct, getEditProduct, postEditProduct, postDeleteProduct } from '../controllers/admin.js';

const router = Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/products => GET
router.get('/products', getProducts);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId',getEditProduct);

router.post('/edit-product',postEditProduct);

// delete product
router.post('/delete-product',postDeleteProduct);


export default router;
