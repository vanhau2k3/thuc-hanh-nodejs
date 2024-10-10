import mysql from 'mysql2'
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'testnodejs',
    pass: ''
});
const connection = pool.promise();
export default connection
