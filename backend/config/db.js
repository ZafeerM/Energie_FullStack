import mysql from 'mysql2/promise';

// !------------------ Connect & SetUp MySql database ------------------

export const mydatabase = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "maindb_energie"
    // NOTE: If test database not created, kindly create in Xampp first
});
console.log("Connected to Database.");

// !--------------- End - Connect & SetUp MySql database ---------------
