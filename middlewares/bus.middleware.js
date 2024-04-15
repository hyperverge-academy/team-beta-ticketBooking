const busSchema  = require('./validationsSchema');
const resConstants = require('../constants/response.constants')

const busesValidationSchema = async function (req, res, next) {
    try {
        const result = busSchema.validate(req.body)
        if (result.error) {
            return res.status(400).json({ error: result.error.details[0].message });
        }
        next();
    }
    catch (error) {
        console.log(error)
        return resConstants.internalServerError
    }

}

module.exports = { busesValidationSchema }