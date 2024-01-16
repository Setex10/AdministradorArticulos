
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const use = encodeURIComponent(process.env.USERNAMEDB);
const password = encodeURIComponent(process.env.PASSWORDDB)
const uri = `mongodb+srv://${use}:${password}@setexdb.3t9dtiq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
   // Send a ping to confirm a successful connection
     console.log("Pinged your deployment. You successfully connected to MongoDB!");
   } finally {
   // Ensures that the client will close when you finish/error
   await client.close();
  }
}
run().catch(console.dir);

module.exports = {client, ObjectId}

