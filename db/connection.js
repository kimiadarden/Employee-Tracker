const mysql =require ("mysql");
const util = require("util");


var connection = mysql.createConnection({
    host: "localhost",
  
    // port: 3306,
    user: "root",
  
    password: "",
    database: "employee_DB"
  });


  connection.connect(function (err) {
    if (err) throw err;
});

  module.exports.connection;