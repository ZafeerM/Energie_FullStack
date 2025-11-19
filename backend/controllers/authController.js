import { mydatabase } from "../config/db.js";
import jwt from 'jsonwebtoken';

// *----------------------------- LOGIN PAGE ----------------------------

// Simple Response on localhost:3000 (Shows all users table data)

// Check User from database (Login)
export async function login(req, resp) {
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
};

// check Admin 
export async function loginAdmin(req, resp) {
    // const sqluser = 'SELECT * FROM admins WHERE Email = ?';
    const sql = 'SELECT * FROM admins WHERE (Email = ? AND password = ?)';
    try {
        const{username, password} = req.body;
        
        const fetch = await mydatabase.execute(sql, [username, password]);

        if(fetch[0].length == 0) {
            return resp.status(401).json({message : "Invalid Username Or Password."});
        }

        const user = { name: fetch[0][0].Email };
        const token = jwt.sign(user, process.env.TOKEN_SECRET_PASS);

        return resp.status(201).json({Token: token, 
                                      Message: "Admin login Success"});
    } catch (error) {
        return resp.status(500).json({message : error.message});
    }
};


// *-------------------------- END - LOGIN PAGE -------------------------
