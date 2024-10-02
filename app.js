import { join } from 'path';

import express from 'express';
import bodyParser  from 'body-parser';
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

import sequelize  from './util/database.js';

// error- controller
import { get404 } from './controllers/error.js';

// set template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// load routes
import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';
import { log } from 'console';


// server static
app.use(express.static(join(process.cwd(), 'public')));

//load routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(get404);


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
