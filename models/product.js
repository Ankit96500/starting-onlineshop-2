const db = require('../util/database.js');
const Cart = require('./cart');



module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {    
    return db.execute(`INSERT INTO products (title,price,description,imageUrl) VALUES  (?,?,?,?)`, [this.title,this.price,this.description,this.imageUrl])    
  }

  //delete the product
  static deleteById(id){
    return db.execute('DELETE FROM products WHERE products.id = ?',[id]);
  }


  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  // fetch data by id using dynamic routes:
  static findById(id){
    // console.log('productd result in model.js',res);
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }

};
