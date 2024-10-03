import { join } from 'path';
import express from 'express';
import bodyParser  from 'body-parser';
// import cors from 'cors';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ extended: false }));

// set template engine
app.set('view engine', 'ejs');
app.set('views', 'views');


// server static
app.use(express.static(join(process.cwd(), 'public')));

// anonynomus func middelware so that i acces this user anywhere in the project
app.use((req,res,next) =>{
    User.findByPk(1).then(
        user=>{
            req.user = user;
            next();
        })
    .catch(err=>{
        console.log(err);
    });
})



import User from './models/user.js';
import Product from './models/product.js';
import Cart from './models/cart.js';
import CartItem from './models/card-item.js';
import sequelize  from './util/database.js';

// error- controller
import { get404 } from './controllers/error.js';

// load routes
import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';

//load routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(get404);


//call sequelize to make table
// sequelize.sync({ force: false })  // { force: true } will drop and recreate tables, use carefully

// make relation in between user and product
// ADD REALTIONS::::
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

// we ceate user if no user we have and cart also
sequelize
// .sync({force:true})
.sync()
.then(result => {
    return User.findByPk(1)
    // console.log(result);
    // server lintening...
    
})
.then(user =>{
    if (!user) {
        return User.create({name:'mike',phone_no:88882,email:"mike.p@gmail.com"})
    }
    // the .then() will automatically warp in function a new parameter
    // return Promise.resolve(user);
    return user;
})
.then(user =>{
    return user.createCart();

})
.then(cart=>{
    app.listen(3000);

})

.catch(err =>{
    console.log(err);
    
})
