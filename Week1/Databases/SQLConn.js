const mysql = require('mysql2/promise.js')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

async function testConn() {
    try {
        const connection = pool.getConnection()
        console.log("Connection established")
    } catch (error) {
        console.log('Error happening at: ', error)
    }
}

testConn();

module.exports = pool
