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
    database: "test"
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
    origin: 'http://localhost:3000',
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

// ?----------------- End - Creation of User Tables etc -----------------


// *----------------------------- LOGIN PAGE ----------------------------

// Simple Response on localhost:3000 (Shows all users table data)
// Middleware authenticates login user and output only that user's data
app.get('/', Authenticate, async(req, resp) => {
    // resp.send("Hello From Database.");

    const [user_data] = await mydatabase.execute(`
    SELECT * 
    FROM users 
    WHERE Username = ?`, [req.user.name]);

    resp.json(user_data);
}); 

// Add User to Database (Sign Up)
app.post('/signup', async(req, resp) => {
    try {
        //expecting json from front-end
        const {Username, Password} = req.body;

        await(mydatabase.execute(`
            INSERT INTO users(Username, password)
            VALUES (?, ?)`, [Username, Password])
        );

        resp.status(201).json({message: "Added New User Successfully."});
    } 
    catch (error) {
        resp.status(500).json({message: error.message});
    }
});

// Check User from database (Login)
app.post('/login', async(req, resp) => {
    try {
        const {Username, Password} = req.body;

        // checking empty input
        if(!Username || !Password)
            return resp.status(400).json({message: "Bad Request. Empty Credentials."});
        
        // check user
        const fetched_data = await(mydatabase.execute(`
        SELECT * FROM Users WHERE Username = ?`, 
        [Username]));

        // check if user not found
        if(fetched_data[0].length == 0)
            return resp.status(401).json({message: "Invalid Credentials 1"});

        // check password
        if(Password === fetched_data[0][0].Password)
        {
            // We Reach here if everything is authenticated

            // Creating JWT token for User
            const user = { name: fetched_data[0][0].Username };
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

// For authentication of User Token (That user sends)
function Authenticate(req, resp, next)
{
    //Token has two parts Bearer Token
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

// *-------------------------- END - LOGIN PAGE -------------------------