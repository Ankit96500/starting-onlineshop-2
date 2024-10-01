const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodeJS',
    password:'1Ankit@2002'
});


module.exports = pool.promise();
