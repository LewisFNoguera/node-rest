import { config as configDotenv } from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";


configDotenv();
const username = encodeURIComponent(process.env.DB_USR);
const password = encodeURIComponent(process.env.DB_PW);
const db = process.env.DB;
const cluster = "cluster0.wsy1a.mongodb.net";

const uri = `mongodb+srv://${username}:${password}@${cluster}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

export async function connectDB() {
  try {    
    
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    console.log("✅ Conectado a MongoDB Atlas");

    const dbName = process.env.DB;
    const database = client.db(dbName);
    return database;    

  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
}
