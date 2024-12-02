import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGO_URI1;

// Create MongoClient with MongoClientOptions object to set Stable API ver
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

try {
    // Connect client to server	(optional starting in v4.7)
    await client.connect();
    // Send ping to confirm successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. Successfully connected to MongoDB');
}
catch(err) {
    // Ensures that client will close when you finish/error
    await client.close();
    console.error('Failed to connect to MongoDB', err);
    throw err;
}

// run().catch(console.dir);
const db = client.db('gemini_db');  // Automatically creates 'prompts' database
// const promptsCollection = db.collection('prompts');
// const storiesCollection = db.collection('stories');

export default db;
// export default promptsCollection;
// export default storiesCollection