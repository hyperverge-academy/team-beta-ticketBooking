const { bookingSchema, userRegisterSchema,userLoginSchema } = require('./validationsSchema')

const resConst = require('../constants/response.constants')

const bookingValidationSchema = async function (req,res,next){
    try{
        const output = bookingSchema.validate(req.body);
        if (output.error){
            return res.status(400).json({
                error:output.error.details.message
            });
        }
        next();
    }
    catch(err){
        console.log(err)
        return resConst.internalServerError;
    }
}

const userRegistrationValidationSchema = async function (req ,res ,next){
    try{
        const output =  userRegisterSchema.validate(req.body);
        if (output.error){
            return res.status(400).json({
                error:output.error.details.message
            });
        }
        next();
    }
    catch(err){
        console.log(err)
        return resConst.internalServerError;
    }
}

const loginValidationSchema = async function (req, res , next){
    try{
        const output = userLoginSchema.validate(req.body);
        if (output.error){
            return res.status(400).json({
                error:output.error.details.message
            });
        }
        next();
    }
    catch(err){
        console.log(err)
        return resConst.internalServerError;
    }
}


module.exports = {bookingValidationSchema ,userRegistrationValidationSchema ,loginValidationSchema }