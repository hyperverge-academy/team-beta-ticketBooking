const Joi = require('joi');

// const busModels = require('../models/buses.model');
// const dbConst= require('../constants/response.constants');

const busSchema = Joi.object({
    bus_name: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    days: Joi.array().items(Joi.string().valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")).min(1).required(),
    total_seats: Joi.number().integer().min(1).required(),
    total_time: Joi.string().required(),
    bus_stops: Joi.array().items(Joi.string()).required()
});

const userRegisterSchema = Joi.object({
    fullName : Joi.string().required(),
    mobileNumber : Joi.number().min(1000000000).max(9999999999).required(),
    password: Joi.string().length(8).pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8}$/)).required().messages({
        "string.pattern.base": `Password should have Atleast one speacial character , one number , one uppercase character and should be of length 6 to 16`,
      }),
    confirmPassword : Joi.string().valid(Joi.ref('password')).required().error(new Error('Password and confirm password must match'))

})

const userLoginSchema = Joi.object({
    mobileNumber : Joi.number().min(1000000000).max(9999999999).required(),
    password : Joi.string().length(8).required(),

})

const bookingSchema = Joi.object({
    passenger_name : Joi.string().required(),
    passenger_age :Joi.number().integer().min(1).max(89).required(),
    passenger_gender : Joi.string().valid("Female" , "Male" , "Others").required(),
    bus_id : Joi.string().required(),
    arrival_dateTime: Joi.date().iso().required(),
    departure_dateTime: Joi.date().iso().required().min('now'),
    from:Joi.string().required(),
    to : Joi.string().required(),
    bus_name : Joi.string().required(),
    price : Joi.number().integer().min(0).max(10000).required(),
    seat_number : Joi.number().integer().min(1).required()
})

module.exports = {busSchema , userRegisterSchema , userLoginSchema ,bookingSchema};