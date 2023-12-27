const userService = require('../services/users.services');

const registrationPost = async function(req , res ){
    const data = req.body
    res.send(await userService.registrationPostService(data))
    
}
const loginController = async function (req , res){
    const loginData = req.body 
    res.send(await userService.loginPostService(loginData));
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

module.exports = { getBookings , bookTicket, registrationPost , loginController};