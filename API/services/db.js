const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
  const connection = await mysql.createConnection({
    host: 'db',
    user: 'ualinventarium',
    password: 'uS3rP4ssM0Ord20D1f1CIL3',
    database: 'ualinventarium',
    port: '3306'
  });
  const [results,] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query
}