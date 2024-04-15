const userModel = require('../models/users.model')

const registerUser = async function(req , res ,next){
    const registrationData = req.body
    console.log(registrationData);
    res.send(await userModel.registerUserService(registrationData))
    next()
}
const loginUser = async function (req , res , next){
    const loginData = req.body 
    res.send(await userModel.loginUserService(loginData));
    next()
}

const bookTicket = async(req, res ,next) => {
    const output = await userModel.validateBookingData(req.body)
    res.send(output)
    next()
};

const getBookings =  async (req, res ,next) => {
        const userId = req.params.id;
        const userBookings = await userModel.getUserBookings(userId);
        res.send(userBookings)
        next()
};

module.exports = { getBookings , bookTicket, registerUser , loginUser};
