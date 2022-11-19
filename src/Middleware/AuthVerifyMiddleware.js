const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    let token = req.headers['token-key'];

    jwt.verify(token,'kamal1234',(error, decode)=>{
        if(error){
            res.status(401).json({status:'unauthorize', data: error});
        }
        else{
            //request token and add with request header
             let username = decode['data']['userName'];
             req.headers.username = username;
            next();
        }
    });

}