const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

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
    res.json({ message: "Conexión exitosa a MongoDB" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// rutas API deben ir aquí
app.post('/api/businesses', async (req, res) => {
  try {
    const db = await connectDB();
    const { nombre, desc, usuario } = req.body;

    const result = await db.collection('negocio').insertOne({
      nombre,
      desc,
      usuario,
    });

    res.status(201).json({ message: 'Negocio creado', insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/user', async (req, res) => {
  try {
    const db = await connectDB();
    const { nombre, correo, cont } = req.body;

    const result = await db.collection('usuarios').insertOne({
      nombre,
      correo,
      cont,
    });

    console.log(result);

    res.status(201).json({ message: 'Usuario creado', _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/user/find', async (req, res) => {
  try {
    const db = await connectDB();
    const { correo, cont } = req.body;

    console.log("correo");

    const result = await db.collection('usuarios').findOne({
      correo: correo,
      cont: cont,
    });

    console.log(result);

    if (!result) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ _id: result._id, nombre: result.nombre, correo: result.correo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/businesses/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const business = await db.collection('negocio').findOne({ _id: new ObjectId(id) });

    if (!business) return res.status(404).json({ error: 'Negocio no encontrado' });
    res.json(business);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/businesses/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const update = req.body;

    const result = await db.collection('negocio').updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    if (result.matchedCount === 0) return res.status(404).json({ error: 'Negocio no encontrado' });
    res.json({ message: 'Negocio actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/businesses/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;

    const result = await db.collection('negocio').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Negocio no encontrado' });

    res.json({ message: 'Negocio eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});