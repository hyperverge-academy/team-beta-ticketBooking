const userService = require('../services/users.services');

const registerUser = async function(req , res){
    const registrationData = req.body
    res.send(await userService.registerUserService(registrationData))
    
}
const loginUser = async function (req , res){
    const loginData = req.body 
    res.send(await userService.loginUserService(loginData));
}
const bookTicket = async(req, res) => {
    const output = await bookingService.validateBookingData(req.body)
    res.json(output)
};

const getBookings =  async (req, res) => {
        const userId = req.params.id;
        const userBookings = await userService.getUserBookings(userId);
        res.send(userBookings)
};

module.exports = { getBookings , bookTicket, registerUser , loginUser};
