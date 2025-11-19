import jwt from 'jsonwebtoken';

// !---------------------------- MIDDLEWARE -----------------------------

// For authentication of User Token (That user sends)
export function Authenticate(req, resp, next)
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
