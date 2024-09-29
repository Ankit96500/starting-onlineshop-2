const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


// error- controller
const errorController = require('./controllers/error');

// set template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// load routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// server static
app.use(express.static(path.join(__dirname, 'public')));

//load routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// server lintening...
app.listen(3000);
