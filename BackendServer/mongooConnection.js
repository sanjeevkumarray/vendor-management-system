const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Connection string for local MongoDB

// Create a MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Access the database
    const db = client.db("Vendor"); // Use the database name as 'Vendor'

    // You can perform operations here, e.g., a simple find command
    const collections = await db.listCollections().toArray();
    console.log("Collections in Vendor database:", collections);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
