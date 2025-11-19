//  imports
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

//import server components
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// !------------------ Connect & SetUp MySql database ------------------

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

// Allow using of all routes we made
app.use('/', authRoutes);
app.use('/', userRoutes);

// Starting listening server
app.listen(5050, () => {
    console.log("Listening from PORT : 5050.");
});

// !--------------- End - Connect & SetUp MySql database ---------------
