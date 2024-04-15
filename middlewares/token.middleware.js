const jwt = require('jsonwebtoken');
const resConstants = require('../constants/response.constants');
const errors  = require('./validationsSchema');

const verifyTokenRequest = async function (req, res , next) {
let token = await req.headers.authorization;

if(!token){
    return res.status(401).json(resConstants.unauthorizedMessage);

}
token = token.split(' ')[1];

try{
    const tokenExpires = process.env.TOKEN_EXPIRE
    const securityKey  = process.env.SECURITY_KEY

    const userId = req.parms.userId
    const isVerified = jwt.verify(token , securityKey , (err,decoded) =>{
        if(errors) {
            if (errors.name === tokenExpires){
                return resConstants.json(resConstants.tokeExpiredError);
            }
            else{
                console.log(errors)
                return res.json(errors , resConstants.unauthorizedMessage);
            }

    }
    if (userId != decoded.userDat.mobileNumber){
        return resConstants.json(resConstants.unauthorizedMessage);

    }
    req.user = decoded;
    next();
});

}
catch(errors){
    console.log(errors)
    return resConstants.internalServerError;
}
}

module.exports = {verifyTokenRequest} ;
