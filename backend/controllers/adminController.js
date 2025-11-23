import { mydatabase } from "../config/db.js";


export async function addcustomer(req, resp) {
    const {firstn, lastn, number, mail, add1, add2} = req.body;

    try {
        const sql = 'INSERT INTO consumers (FName, LName, ContactNo, Address1, Address2) VALUES (?, ?, ?, ?, ?)';
        const sqlget = 'SELECT ConsumerID FROM consumers WHERE (FName = ? AND LName = ? AND ContactNo = ? AND Address1 = ? AND Address2 = ?)';
        const sqllogin = 'INSERT INTO logindetails (ConsumerID, username, password) VALUES (?, ?, ?)';
        
        const checkemail = 'SELECT COUNT(*) AS repeats FROM logindetails WHERE username = ? GROUP BY username';


        const[check] = await mydatabase.execute(checkemail, [mail]);

        // console.log(check)

        if(check[0] && check[0].repeats > 0)
            return resp.status(500).json({message : "Email Already Exists"});

        await mydatabase.execute(sql, [firstn, lastn, number, add1, add2]);
        
        const[data] = await mydatabase.execute(sqlget, [firstn, lastn, number, add1, add2]);

        console.log(data[0].ConsumerID);

        await mydatabase.execute(sqllogin, [data[0].ConsumerID, mail, "1234"]);

        return resp.status(201).json({message : "Added Successfully."});
    
    } catch (error) {
        return resp.status(500).json({error : error.message});
    }

}

export async function AllRequests(req, resp) {
    try {
        // console.log("FFFF");
        const sql = `SELECT * 
                     FROM connectionrequests
                     ORDER BY CASE WHEN Status = 'PENDING' THEN 0 ELSE 1 END`;

        const [data] = await mydatabase.execute(sql);

        return resp.status(201).json(data);

    } catch (error) {
        return resp.status(500).json({message: error.message});
    }
}

export async function updateRequest(req, resp) {
    try {
        const {types, consumerid, Address, RequestID, updateType} = req.body;

        const sql = `UPDATE connectionrequests
                     SET Status = ?
                     WHERE RequestID = ?`;
        
        const metersql = `INSERT INTO meters (Location, InstallationDate, Status) 
                          VALUES (?, NOW(), ?);`;

        const getmeterid = `SELECT MeterID 
                            FROM meters
                            WHERE Location = ?`;
        
        const addconnection = `INSERT INTO connections (Type, MeterID, ConsumerID, WarningCount, BalancePayment) 
                               VALUES (?, ?, ?, ?, ?)`;
        
        const addtoreading = `INSERT INTO readings (MeterID, ReadingValue, ReadingDate)
                              VALUES (?, -1, NOW())`;

        const [data] = await mydatabase.execute(sql, [updateType, RequestID]);

        if(updateType === 'APPROVED') {
            await mydatabase.execute(metersql, [Address, "Active"]);

            const [meterid] = await mydatabase.execute(getmeterid, [Address]);

            await mydatabase.execute(addconnection, [types, meterid[0].MeterID, consumerid, 0, 0]);

            await mydatabase.execute(addtoreading, [meterid[0].MeterID]);
        }

        return resp.status(201).json({message : "Updated Succesfully"});

    } catch (error) {
        return resp.status(500).json({message: error.message});
    }
}

export async function MetersAndUnits(req, resp) {
    try {
        const sql = `SELECT m.MeterID, m.Location, m.Status, r.ReadingValue, c.Type, c.ConnectionID
                     FROM meters m
                     JOIN readings r ON m.MeterID = r.MeterID
                     JOIN connections c ON m.MeterID = c.MeterID`;

        const [data] = await mydatabase.execute(sql);

        return resp.status(201).json(data);

    } catch (error) {
        return resp.status(500).json({message: error.message});
    }
}

export async function GenerateBill(req, resp) {
    const connection = await mydatabase.getConnection();
    try {
        const { meter, units, type, cid } = req.body;
        await connection.beginTransaction();

        if(units === -1){
            connection.release();
            return resp.status(500).json({message : "Meter Reader not entered units yet, awaiting..."});
        }

        //!-----ADD TO BILLS

        const billsql = `INSERT INTO bills (ConnectionID, UnitsConsumed, PerUnitRate, TotalAmount, DueDate, Status)
                         VALUES (?, ?, ?, ?, NOW(), ?)`;
        
        var rate;

        if(type === 'Government')
            rate = 8;
        else if(type === 'Residential')    
            rate = 10;
        else
            rate = 20;

        var totalAmount = units * rate;
        
        const [billResult] = await connection.execute(billsql, [
            cid,
            units,
            rate,
            totalAmount,
            'PENDING'
        ]);

        const billId = billResult.insertId;


        //!-----GET PREVIOUS DUES

        const getprevdue = `SELECT BalancePayment, WarningCount
                            FROM connections
                            WHERE MeterID = ?`;
        

        const [checkdue] = await connection.execute(getprevdue, [meter]);

        var warning = 0;
        var balance = 0;
        if(checkdue.length !== 0) {
            if (checkdue[0].BalancePayment > 0) {
                warning = checkdue[0].WarningCount + 1;
                balance = Number(checkdue[0].BalancePayment);
            }   
        }

        totalAmount = totalAmount + balance;
        //-----UPDATE Connections 
        const updateconnection = `UPDATE connections
                                  SET BalancePayment = ?, WarningCount = ?
                                  WHERE MeterID = ?`;

        await connection.execute(updateconnection, [totalAmount, warning, meter]);

        //UPDATE READINGS
        const updateunits = `UPDATE readings
                             SET ReadingValue = -1
                             WHERE MeterID = ?`;

        await connection.execute(updateunits, [meter]);

        await connection.commit();
        return resp.status(201).json({ message: 'Bill and payment created successfully' });
    } catch (error) {
        await connection.rollback();
        return resp.status(500).json({message: error.message});
    } finally {
        connection.release();
    }
}

export async function AllCustomers(req, resp) {
    try {
        // console.log("FFFF");
        const sql = `SELECT * 
                     FROM consumers`;

        const [data] = await mydatabase.execute(sql);

        return resp.status(201).json(data);

    } catch (error) {
        return resp.status(500).json({message: error.message});
    }
}

export async function MeterBlocking(req, resp) {
    try {
        const sql = `SELECT c.*, m.Status
                     FROM connections c
                     JOIN meters m ON c.MeterID = m.MeterID 
                     ORDER BY WarningCount DESC`;

        const [data] = await mydatabase.execute(sql);
    
        return resp.status(201).json(data);
    } catch (error) {
        return resp.status(500).json({message: error.message});
    }
}

export async function BlockMeter(req, resp) {
    const { meter } = req.body;
    try {
        const sql = `UPDATE meters
                     SET Status = ?
                     WHERE MeterID = ?`;

        await mydatabase.execute(sql, ["Blocked", meter]);
    
        return resp.status(201).json({message : "Blocked Successfully."});
    } catch (error) {
        return resp.status(500).json({message: error.message});
    }
}
