import { mydatabase } from "../config/db.js";
import jwt from 'jsonwebtoken';

// ?--------------------------- DASHBOARD PAGE --------------------------

// Middleware authenticates login user and output only that user's data
export async function ProfileInfo(req, resp) {
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

}; 

// For more items its axios.post(url, data, headers)
export async function UpdatePass(req, resp) {
    const sql = 'UPDATE logindetails SET password = ? WHERE (username = ? AND password = ?)';

    try {
        const {oldpass, newpass} = req.body;

        // For items its axios.post(url, data, headers)
        const [data] = await mydatabase.execute(sql, [newpass, req.user.name, oldpass]); 

        return (data.affectedRows == 0 ? resp.status(400).json({message : "Incorrect pass."}) : resp.status(201).json(data));

        
    } catch (error) {
        return resp.status(401).json({message : error.message});
    }
};

// ?------------------------ END - DASHBOARD PAGE -----------------------
