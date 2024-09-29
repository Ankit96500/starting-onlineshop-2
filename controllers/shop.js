// imported all product models
const Product = require('../models/product');
const Cart = require('../models/cart');


// write our controller
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

// it take dynamic route parameter
exports.getProduct = (req,res,next)=>{
  const product_id = req.params.productId
  Product.findById(product_id,product =>{
    console.log('product-->',product);
    res.render('shop/product-detail',{
      product:product,
      pageTitle:product.title,
      path:'/products'  
    })
  })
  
}



exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

// handel post request
exports.postCart = (req,res,next) =>{
  const product_id = req.body.productId;
  Product.findById(product_id,(product) =>{
    Cart.addProduct(product_id,product.price)
  });
  console.log('product id',product_id);
  res.redirect('/')
  
}


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
