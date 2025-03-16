const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "root",
  password: "4370",
  database: "myapp",
});

exports.pool = pool;
