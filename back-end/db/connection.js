const mysql = require('mysql');

const db = mysql.createConnection( 
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'airline_reservation_system'
    }
)

module.exports = db;