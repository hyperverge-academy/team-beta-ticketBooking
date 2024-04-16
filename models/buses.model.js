const { Schema, model } = require("mongoose");
const Joi = require("joi");

const busSchema = new Schema({
    bus_name:{
        type:String,
        required:true,
    },
    from:{
        type:String,
        required:true,

    },
    to:{
        type:String,
        required:true,
    },
    days:[{
        type:String,
        list_days:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"],
        required:true,
    }],
    total_seats:{
        type:Number,
        required:true,
        min:1,
    },
    total_time:{
        type:String,
        required:true,
    },
    bus_stops:[{
        type:String,
        required:true,
    }],
})

module.exports = model("Bus", busSchema);