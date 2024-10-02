
import { readFile, writeFile } from 'fs';
import { join } from 'path';
import { postDeleteProduct } from '../controllers/admin.js';
//path
const p = join(
    process.cwd(),
    'data',
    'cart.json'
)
// console.log('show me path in cart',p);

export default class Cart{
   static addProduct(id,productPrice){
    // fetch previous cart
    readFile(p,(err,filecontent)=>{
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
        writeFile(p,JSON.stringify(cart),err =>{
            console.log('err',err);
        });
    });
   }
   // delete product cart:
   static deleteProduct(id,productPrice){
    readFile(p,(err,filecontent)=>{
        // no cart ignore this
        if (err) {
            return;
        }
        const updatedCart = {...JSON.parse(filecontent)};
        const productIndex =  updatedCart.products.find(prod => prod.id === id);
        const  productQty = product.qty;
        updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
        updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
        writeFile(p,JSON.stringify(updatedCart),err =>{
            console.log('err',err);
        });

    });

   }



}