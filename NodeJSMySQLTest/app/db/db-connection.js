const dotenv = require('dotenv')
const mysql2 = require('mysql2')
dotenv.config()

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
})

// pool.getConnection((err, connection) => {
//     if(err) console.log('Database connection error:', err.message)
//     console.log('Successful database connection')
// })


module.exports = pool