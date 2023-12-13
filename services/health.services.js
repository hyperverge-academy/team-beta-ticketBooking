const model = require('../models/health.model')
const getService = function(){
    return model.modelResponse();
}

module.exports = {getService};
