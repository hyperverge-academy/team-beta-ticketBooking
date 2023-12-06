const healthService = require('../services/health.services')

const get = function (req,res){
    console.log(healthService.getservice())
    res.send(healthService.getservice())
    

}

module.exports = {get}
