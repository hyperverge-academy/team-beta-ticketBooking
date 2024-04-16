const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
        min: 1000000000,
        max: 9999999999,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8}$/.test(value);
            },
            message: "Password should have Atleast one special character, one number, one uppercase character, and should be of length 8",
        },
    },
});

const User = model("User", userSchema);