import { where } from 'sequelize';
import Product  from '../models/product.js';
import User from '../models/user.js';

export function getAddProduct(req, res, next) {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
    editing:false,
  });
}

export function postAddProduct(req, res, next) {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //new way not work..
  // req.user.CreateProduct({
  //   title:title,
  //   price:price,
  //   imageUrl:imageUrl,
  //   description:description,
  // })
  
  // old way to insert
  Product.create({    
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description,
    userId:req.user.id
  })
  .then(result=>{
    // console.log(result);
    console.log('created data',result);
    res.redirect('/admin/products')
  })
  .catch(err=>{console.log('-->',err);
  })
}

export function getEditProduct(req, res, next) {
  const editMode =  req.query.edit
  
  // if not editmode
  if (!editMode) {
    return res.redirect('/');
  }
  const prodID = req.params.productId;
  req.user.getProducts({where:{id:prodID}})
  // Product.findByPk(prodID)
  .then(products=>{  
    const product = products[0];
    // if not product 
    if (!product) {
      return res.redirect('/');
    }       
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:product
    });
  })
  .catch(err => {console.log(err);
  })
}


export function postEditProduct(req,res,next){
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // this will not directly save data in db we need to call save
  Product.findByPk(prodId)
  .then(product =>{
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    return product.save();
  })
  .then(result=>{console.log('UPDATED DATA');
  })

  // this catch will handel both .then() error
  .catch(err =>{console.log(err);
  })
  res.redirect('/admin/products');
}

// show all admins product
export function getProducts(req, res, next) {
  // Product.findAll()
  req.user.getProducts()
  .then((products)=>{
    console.log('show my peouds',products);
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  // User.findAll()
  // .then((users)=>{
  //   console.log('show my users',users);
  //   res.json(users);
  // })
  .catch(err=>{
    console.log(err);
  });
}

export function postDeleteProduct(req,res,next){
  const prodID = req.body.productId;
  Product.findByPk(prodID)
  .then((product)=>{
    product.destroy();
  })
  .then(result=>{
    console.log('deleted product');
    res.redirect('/admin/products');

  })
  .catch(err=>{
    console.log('NOT DELETED',err);
  });
}





