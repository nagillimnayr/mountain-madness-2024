const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://emdecaiman:mountain-madness-2024@mountain-madness-2024.rrqxwzu.mongodb.net/"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Connected to MongoDB");
  
      // Access the "leaderboard" database
      const db = client.db("leaderboard");
  
      return db;
    } catch (error) {
      console.error("Error connecting to database:", error);
      throw error;
    }
  }

module.exports = {
    connectToDatabase
  };