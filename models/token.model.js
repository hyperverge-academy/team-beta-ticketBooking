const dbConst = require('../constants/db.constants');
const response = require('../constants/response.constants');
const jwt = require('jsonwebtoken');
const { MongoClient } = require("mongodb");

const secretKey = 'say@2200';

let tokenCollection;
const client = new MongoClient(dbConst.uri);
client.connect().then(() => {
    console.log("Connected successfully to database");
    const db = client.db(dbConst.dbName);
    tokenCollection = db.collection(dbConst.tokenCollection)
    userCollection = db.collection(dbConst.userCollection)
})
    .catch(err => console.log(err));

const generateToken = async (userData) => {
    try {
        token = jwt.sign({ userData }, secretKey, { expiresIn: '24h' });
        const updatedToken = { $set: { token: token } }
        const findUpdateToken = await tokenCollection.findOneAndUpdate({ usreId: userData.mobileNumber }, updatedToken);
        console.log(findUpdateToken);

        if (!findUpdateToken) {
            const insertToken = await tokenCollection.insertOne({ userId: userData.mobileNumber, token: token });
            console.log(insertToken);
        }

        const loginResponse = {
            message: response.loginMessage,
            mobileNumber: userData.mobileNumber,
            role: userData.role,
            token: token
        }
        console.log(loginResponse);
        return loginResponse;

    } catch (error) {
        console.error("Token generation error", error);

    }
};


const verifyAuthMiddleware = async (req, res, next) => {
    const authHeader = await req.header("authorization");

    if (!authHeader) {
        return res.status(401).json({ message: response.unauthorizedMessage });
    }

    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1]

    try {
        const verified = jwt.verify(token, secretKey)
        console.log('verified', verified);

        next();
    }
    catch (error) {
        console.log(error);
        return response.unauthorizedMessage;
    }

}

module.exports = { generateToken, verifyAuthMiddleware };