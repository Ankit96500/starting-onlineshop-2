// imported all product models
const Product = require('../models/product');
const Cart = require('../models/cart');


// write our controller
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
      res.render('shop/product-list',{
        prods:rows,
        pageTitle:"All pRoducts",
        path: './products' 
      });
  })
  .catch(err=>{
    console.log(err);
  });
};

// it take dynamic route parameter
exports.getProduct = (req,res,next)=>{
  const product_id = req.params.productId
  // console.log('productd id',product_id);
  Product.findById(product_id) 
  .then(([product])=>{
    console.log('rwows',product);
    res.render('shop/product-detail', {
      product: product[0],
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch((err)=>{
    console.log('err');
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch((err)=>{
    console.log('err');
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
  // console.log('product id',product_id);
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
