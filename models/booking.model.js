const { Schema, model } = require("mongoose");
const Joi = require("joi");

const bookingSchema = new Schema({
    passenger_name: {
        type: String,
        required: true,
    },
    passenger_age: {
        type: Number,
        required: true,
        min: 1,
        max: 89,
    },
    passenger_gender: {
        type: String,
        required: true,
        enum: ["Female", "Male", "Others"],
    },
    bus_id: {
        type: String,
        required: true,
    },
    arrival_dateTime: {
        type: Date,
        required: true,
    },
    departure_dateTime: {
        type: Date,
        required: true,
        min: Date.now,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    bus_name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 10000,
    },
    seat_number: {
        type: Number,
        required: true,
        min: 1,
    },
});

const Booking = model("Booking", bookingSchema);