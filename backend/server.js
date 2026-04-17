const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// conexión MongoDB
const uri = process.env.MONGODB_URI;

// crear cliente MongoDB
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB!");
    return client.db("hackathon_2026"); 
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    throw error;
  }
}

// ruta de prueba
app.get('/api/test', async (req, res) => {
  try {
    const db = await connectDB();
    await db.admin().command({ ping: 1 });
    res.json({ message: "Conexión exitosa a MongoDB!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// rutas API deben ir aquí

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});