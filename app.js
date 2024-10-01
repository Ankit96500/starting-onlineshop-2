const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = require('./util/database.js')

// error- controller
const errorController = require('./controllers/error');

// set template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// load routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { log } = require('console');

// server static
app.use(express.static(path.join(__dirname, 'public')));

//load routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);


//call sequelize to make table
sequelize.sync()
.then(result => {
    // console.log(result);
    // server lintening...
    app.listen(3000);
    
})
.catch(err =>{
    console.log(err);
    
})
