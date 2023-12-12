const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "busData";

let collection;
async function main() {
  await client.connect();
  console.log("Connected successfully to database");
  const db = client.db(dbName);
  collection = db.collection("registration");
}
main();

const postResponse = async function (data) {
  try {
    const info = collection.find({});
    const documents = await info.toArray();
    let arrayData = [];
    for (let doc of documents) {
      arrayData.push(doc.mobileNumber);
      arrayData.push(doc.password);
    }
    if (
      arrayData.includes(data.password) &&
      arrayData.includes(data.mobileNumber)
    ) {
      return "This data is already exists";
    } else {
      const result = await collection.insertOne(data);
      return { result, massage: "Registration successfull" };
    }
  } catch (error) {
    console.error("Error inserting document:", error);
    return error;
  }
};

module.exports = { postResponse };
