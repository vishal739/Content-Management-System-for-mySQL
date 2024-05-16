const mysql2= require("mysql2/promise");

const mySqlPool= mysql2.createPool({
    host : "localhost",
    user: "root",
    password: "Spicemi@356",
    database: "vahan_db"
});

module.exports= mySqlPool;