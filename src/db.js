const mysql = require('mysql');
const fs = require('fs');

var conn=mysql.createConnection({
    host:"bapfv9quk0q2dr0ramma-mysql.services.clever-cloud.com", 
    user:"umxlzycttvmzl51g", 
    password:"Gy1MZJVEfSZZvtuSFCPR", 
    database:"bapfv9quk0q2dr0ramma", 
    port:3306
    
});

conn.connect(err => {
    if (err) {
        console.log("Error de Conexion");
    } else {
        console.log("Conexion Exitosa !!!");
    }
});

module.exports = conn;