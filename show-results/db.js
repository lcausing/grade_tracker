import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await client.connect();
    console.log(`✅ Connected to MongoDB database: ${process.env.MONGO_DB}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

export default client;
