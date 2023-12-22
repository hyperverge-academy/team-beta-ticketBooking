const bookingService = require('../services/users.services');

const bookTicket = async(req, res) => {
    const { passenger_name , passenger_age ,passenger_gender ,
            bus_id , arrival_dateTime , departure_dateTime ,from , to ,bus_name 
            , price , seat_number} = req.body
    const output = await bookingService.validateBookingData(req.body)
    res.json(output)
};

module.exports = { bookTicket };
