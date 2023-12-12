const  userModel  = require('../models/users.model');

const postService = async function (data) {
    return await userModel.postResponse(data);
};
   
module.exports = {
    postService
};