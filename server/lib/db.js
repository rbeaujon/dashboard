const mysql = require('mysql');
const config  = require('../config/dbConfig');

exports.db = () => {
  //Connection with MySQL
  let conn  = mysql.createConnection(config);

    conn.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to MySQL correctly.');
  })

  return conn
}

exports.query = async (sql) => {

  let conn = exports.db()
  const queryResult = await new Promise((resolve, reject) => {
    conn.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return queryResult
}