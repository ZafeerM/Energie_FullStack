import { mydatabase } from "../config/db.js";

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

// For more items its axios.post(url, data, headers)
export async function NewRequest(req, resp) {

    try {
        const { meteraddress, metertype } = req.body;
        const requestSql = `INSERT INTO connectionrequests (ConsumerID, RequestDate, Status, Address, Type) 
                            VALUES (?, NOW(), ?, ?, ?);`;
        const getConsumer = 'SELECT ConsumerID FROM logindetails WHERE (username = ?)';

        const [consumer] = await mydatabase.execute(getConsumer, [req.user.name]);
        
        // console.log(consumer);

        await mydatabase.execute(requestSql, [consumer[0].ConsumerID, "PENDING", meteraddress, metertype]);

        return resp.status(201).json({message : "Meter Request Lodged Successfully."});

    } catch (error) {
        return resp.status(500).json({message : error.message});
    }
}

export async function MyRequests(req, resp) {
    try {
        // console.log("FFFF");
        const sql = `SELECT * 
                     FROM connectionrequests 
                     WHERE ConsumerID = ?`;

        const getidsql = `SELECT ConsumerID 
                          FROM logindetails
                          WHERE username = ?`;


        const [getID] = await mydatabase.execute(getidsql, [req.user.name]);
        
        // console.log(getID);
        const [data] = await mydatabase.execute(sql, [getID[0].ConsumerID]);

        return resp.status(201).json(data);

    } catch (error) {
        return resp.status(500).json({message: error.message});
    }
}

export async function DeleteRequest(req, resp) {
    try {
        console.log("Del wala");
        const sql = `DELETE FROM connectionrequests
                     WHERE RequestID = ?`;
        const {todeleteid} = req.body;

        const [data] = await mydatabase.execute(sql, [todeleteid]);

        return resp.status(201).json({message : "Request Deleted Successfully"});

    } catch (error) {
        return resp.status(500).json({message : error.message});
    }
}

export async function MyPayments(req, resp) {
    try {
        const sql = `SELECT b.*
                     FROM bills b
                     JOIN connections c ON c.ConnectionID = b.ConnectionID
                     JOIN logindetails ld ON ld.ConsumerID = c.ConsumerID
                     WHERE username = ?`;

        // const getidsql = `SELECT ConsumerID 
        //                   FROM logindetails
        //                   WHERE username = ?`;


        // const [getID] = await mydatabase.execute([req.user.name]);
        
        // console.log(getID);
        const [data] = await mydatabase.execute(sql, [req.user.name]);

        return resp.status(201).json(data);

    } catch (error) {
        return resp.status(500).json({message: error.message});
    }
}


export async function PayBill(req, resp) {

    const connection = await mydatabase.getConnection();
    
    try {
        const { bid, totalbal, cid } = req.body;
        await connection.beginTransaction();

        // Bill Status Paid
        const billstatus = 'UPDATE bills SET Status = "PAID" WHERE BillID = ?';
        await connection.execute(billstatus, [bid]);
        
        // Connection Balance - Bill Total


        // Warning 0 if Balance 0

        //get prev balance
        const getprevdue = `SELECT c.BalancePayment
                            FROM connections c
                            JOIN bills b ON c.ConnectionID = b.ConnectionID
                            WHERE b.BillID = ?`;
        const [checkdue] = await connection.execute(getprevdue, [bid]);

        var balance = Number(checkdue[0].BalancePayment) - totalbal;

        //-----UPDATE Connections 
        if(balance === 0) {
            const updateconnection = `UPDATE connections c
                                      JOIN bills b ON c.ConnectionID = b.ConnectionID
                                      SET c.BalancePayment = ?, b.WarningCount = 0
                                      WHERE b.BillID = ?`;
            
            await connection.execute(updateconnection, [balance, bid]);

            // Meter unblock
            const meterunblock = `UPDATE meters m
                                  JOIN connections c ON c.MeterID = m.MeterID 
                                  SET m.Status = "Active"
                                  WHERE c.ConnectionID = ?`;
            
            await connection.execute(meterunblock, [cid]);


        } else {
            const update = `UPDATE connections c
                            JOIN bills b ON c.ConnectionID = b.ConnectionID
                            SET c.BalancePayment = ?
                            WHERE b.BillID = ?`;
            
            await connection.execute(update, [balance, bid]);
        }


        // Add To Payments



        await connection.commit();
        return resp.status(201).json({ message: 'Bill Paid' });

    } catch (error) {
        await connection.rollback();
        return resp.status(500).json({message: error.message});
    } finally {
        connection.release();
    }

    //         // INSERT IN PAYMENTS
    //     const paymentSql = `INSERT INTO payments (BillID, Amount, Status, PaymentDate)
    //                         VALUES (?, ?, ?, ?)`;

    //     await connection.execute(paymentSql, [
    //         billId,
    //         totalAmount,     
    //         'UNPAID',        
    //         new Date()       
    //     ]);
}


// ?------------------------ END - DASHBOARD PAGE -----------------------
