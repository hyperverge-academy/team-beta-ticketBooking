const bookingService = require('../services/users.services');

const bookTicket = async(req, res) => {
    const output = await bookingService.validateBookingData(req.body)
    res.json(output)
};

const getBookings =  async (req, res) => {
        const userId = req.params.id;
        const userBookings = await bookingService.getUserBookings(userId);
        res.send(userBookings)
};

module.exports = { getBookings , bookTicket };