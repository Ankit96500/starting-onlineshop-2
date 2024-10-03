// imported all product models
import Product from '../models/product.js';
import Cart from '../models/cart.js';
import { where } from 'sequelize';
import { Where } from 'sequelize/lib/utils';



// write our controller
export function getProducts(req, res, next) {
  Product.findAll()
  .then(products =>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'all products',
      path: '/products'
    });
  })
  .catch(err=>{
    console.log(err);
  })
}


// it take dynamic route parameter
export function getProduct(req,res,next){
  const product_id = req.params.productId
  console.log('productd id',product_id);
  // apparoach 1
  // Product.findAll({Where:{id:product_id}})
  // .then((product)=>{
  //   // console.log('rwows',product);
  //   res.render('shop/product-detail', {
  //     product: product[0],
  //     pageTitle: product[0].title,
  //     path: '/products'
  //   });
  // })
  // .catch((err)=>{
  //   console.log('err');
  // });
  // apparoach 1
  Product.findByPk(product_id)
  .then((product)=>{
    console.log('rwows',product);
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch((err)=>{
    console.log('err');
  });
}

export function getIndex(req, res, next) {
  Product.findAll()
  .then(products =>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>{
    console.log(err);
  })
}

export function getCart(req, res, next) {
  // console.log(res.user.Cart);
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts()
    .then(products=>{
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:products
      });
    })
    .catch(err=>{
      console.log(err);
    });
  })
  .catch(err=>{console.log(err);
  });
 
}

// handel post request
export function postCart(req,res,next){
  const prodId = req.body.productId;
  let fetchCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart=>{
      fetchCart = cart
      return cart.getProducts({where:{id:prodId}});    
    })
    .then(products=>{
      let product;
      if (products.length > 0) {
        product = products[0]
      }
    
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity +1;
       // it automatically wrap by promise
        return product;
      }
      return Product.findByPk(prodId)
    })
    .then(product=>{
        // magic method by sequelize
      return fetchCart.addProduct(product,{
        through:{quantity:newQuantity}
      })
    })
    .then(()=>{
      res.redirect('/cart');
    })
    .catch(err=>{console.log(err);
    })
    
}


export function getOrders(req, res, next) {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
}

export function getCheckout(req, res, next) {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
}


export function postCartDeleteProduct(req,res,next){
  const prodId = req.body.productId;
  req.user
  .getCart()
  .then(cart=>{
    return cart.getProducts({where:{id:prodId}});
  })
  .then(products=>{
    const product = products[0];
    product.cartItem.destroy();
  })
  .then(result =>{
    res.redirect('/cart');
  })
  .catch(err=>{console.log(err);
  })
}
