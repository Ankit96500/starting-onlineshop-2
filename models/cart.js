
const fs = require('fs');
const path = require('path');
//path
const p = path.join(
    process.cwd(),
    'data',
    'cart.json'
)
console.log('show me path in cart',p);

module.exports = class Cart{
   static addProduct(id,productPrice){
    // fetch previous cart
    fs.readFile(p,(err,filecontent)=>{
        let cart = {products:[], totalPrice: 0};
        //dont have an error
        if(!err){
            cart = JSON.parse(filecontent)
        }
        // analysis the cart => find the exixting product
        const existingProductIndex = cart.products.findIndex(
            prod =>prod.id === id);
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
       // add new product // increase quantity
        if (existingProduct) {
            // updatedProduct =  { ...existingProduct, qty: existingProduct.qty + 1 };
            updatedProduct = { ...existingProduct };
            updatedProduct.qty = updatedProduct.qty + 1;
            cart.products =[...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        } else {
            updatedProduct = {id: id, qty:1};
            cart.products = [...cart.products,updatedProduct];
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        fs.writeFile(p,JSON.stringify(cart),err =>{
            console.log('err',err);
        });
    });

   }

}