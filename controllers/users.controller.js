const userService = require('../services/users.services')

const post = async function(req , res ){
    const data = req.body
    res.send(await userService.postService(data))
    
}
module.exports = {
    post
}