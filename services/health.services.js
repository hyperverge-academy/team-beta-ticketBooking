const model = require('../models/health.model')
const getservice = function(){
    return model.response();
}

module.exports = {getservice};
