//  imports
import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import cors from 'cors';

// !------------------ Connect & SetUp MySql database ------------------

const mydatabase = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "maindb_energie"
    // NOTE: If test database not created, kindly create in Xampp first
});
console.log("Connected to Database.");

// Connecting Express Js
const app = express();

// Allow use of json and html 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//allowing 1 local host to send req to other local host (browser stops this)
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Starting listening server
app.listen(5050, () => {
    console.log("Listening from PORT : 5050.");
});

// !--------------- End - Connect & SetUp MySql database ---------------


// ?-------------------- Creation of User Tables etc --------------------

// Create Users table in test database
/*
await(mydatabase.execute(`
    CREATE TABLE Users(
        UserNumber  INT AUTO_INCREMENT PRIMARY KEY,
        Username    VARCHAR(50) UNIQUE NOT NULL,
        Password    VARCHAR(50) UNIQUE NOT NULL
    )
`));
await(mydatabase.execute(`
    INSERT INTO Users(Username, Password)
    VALUES ("zafeer@gmail.com", "1234")
`));
console.log("updated.");
*/

// .sql file has all intial creation

// ?----------------- End - Creation of User Tables etc -----------------


// *----------------------------- LOGIN PAGE ----------------------------

// Simple Response on localhost:3000 (Shows all users table data)

// Check User from database (Login)
app.post('/login', async(req, resp) => {
    try {
        const {Username, Password} = req.body;

        // checking empty input
        if(!Username || !Password)
            return resp.status(400).json({message: "Bad Request. Empty Credentials."});
        
        // check user
        const fetched_data = await(mydatabase.execute(`
        SELECT * FROM logindetails WHERE username = ?`, 
        [Username]));

        // check if user not found
        if(fetched_data[0].length == 0)
            return resp.status(401).json({message: "Invalid Credentials 1"});

        // check password
        if(Password === fetched_data[0][0].password)
        {
            // We Reach here if everything is authenticated

            // Creating JWT token for User
            const user = { name: fetched_data[0][0].username };
            const AccessKey = jwt.sign(user, process.env.TOKEN_SECRET_PASS);

            // Sending Token to user with Status
            // The React will get the token in this format !
            return resp.status(201).json({
                token: AccessKey,
                message: 'Login Successful'
            });
        }
        else
            return resp.status(401).json({message: "Invalid Credentials 2"});

    } catch (error) {
        resp.status(500).json({message: error.message});
    }
});

// *-------------------------- END - LOGIN PAGE -------------------------


// ?--------------------------- DASHBOARD PAGE --------------------------

// Middleware authenticates login user and output only that user's data
app.get('/ProfileInfo', Authenticate, async(req, resp) => {
    // resp.send("Hello From Database.");
    try {
        const [user_data] = await mydatabase.execute(`
        SELECT ld.ConsumerID, ld.username, c.FName, c.LName, c.ContactNo, c.Address1, c.Address2
        FROM logindetails ld
        JOIN consumers c ON ld.ConsumerID = c.ConsumerID
        WHERE ld.username = ?`, [req.user.name]);

        // console.log("FROM GET BHAI:", user_data);
        return resp.status(201).json(user_data);
    } catch (error) {
        return resp.status(401).json({message: error.message});
    }

}); 

// For more items its axios.post(url, data, headers)
app.post('/UpdatePass', Authenticate, async(req, resp) => {
    const sql = 'UPDATE logindetails SET password = ? WHERE (username = ? AND password = ?)';

    try {
        const {oldpass, newpass} = req.body;

        // For items its axios.post(url, data, headers)
        const [data] = await mydatabase.execute(sql, [newpass, req.user.name, oldpass]); 

        return (data.affectedRows == 0 ? resp.status(400).json({message : "Incorrect pass."}) : resp.status(201).json(data));

        
    } catch (error) {
        return resp.status(401).json({message : error.message});
    }
})


// ?------------------------ END - DASHBOARD PAGE -----------------------


// !---------------------------- MIDDLEWARE -----------------------------

// For authentication of User Token (That user sends)
function Authenticate(req, resp, next)
{
    //Token has two parts -> {Bearer Token}
    const authHeader = req.headers['authorization'];

    if(!authHeader) return resp.status(400).json({message: "No Token Sent"});

    const token = authHeader.split(' ')[1];

    if(token == null) return resp.status(401).json({message: "No Token Recieved."});

    // what we send on SIGN time of jwt, it returns the same in verify (here its user)
    jwt.verify(token, process.env.TOKEN_SECRET_PASS, (err, user) => {
        if(err)
            return resp.status(403).json({message: "Token not correct!"});
        
        // if all correct, update req user to user returned by jwt
        req.user = user;
        
        //move forward
        next(); 
    })
}

// !------------------------- END - MIDDLEWARE --------------------------
