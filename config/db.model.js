let {MongoClient} = require('mongodb');

let client ;
let dbConnection = async function(){
    try{
        const dbName = process.env.DB_NAME
        const uri = process.env.DB_URI
        if(!client){
            client = new MongoClient(uri)
            await client.connect()
            console.log('database connection established')
        }
        console.log("dbName",dbName)
        return client.db(dbName)
    }
    catch(err){
        console.log('error connecting to database:', err)
    }
}
module.exports = dbConnection