const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const {GoogleGenerativeAI} = require('@google/generative-ai');

const API_KEY = process.env.GEMINI_API_KEY;

if(!API_KEY) {
  console.error('GEMINI_API_KEY environment variable not set.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model:'gemini-2.5-fast' });

async function quickGenerate(question){
  const quickPrompt = `You are an expert social media marketing strategist specializing in small businesses. Give a quick answer to the following question: ${question}`;

  try {
        const result = await model.generateContent(quickPrompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error('Error generating content:', error);
        throw new Error('Failed to generate marketing suggestions.');
    }
}

async function generarVector(texto) {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const result = await model.embedContent(texto);
  return result.embedding.values;
}

async function longGenerate(question){
  const db = await connectDB();
  const collection = db.collection('sugerencias');
  const queryVector = await generarVector(question);

  const resultados = await collection.aggregate([
    {
      "$vectorSearch": {
        "index": "vector_index",
        "path": "embedding_vtr",
        "queryVector": queryVector,
        "numCandidates": 10,
        "limit": 3
      }
    }
  ]).toArray();

  const contextText = resultados
    .map((item, index) => `Resultado ${index + 1}: ${item.desc || item.text || JSON.stringify(item)}`)
    .join('\n');

  const longPrompt = `Eres un estratega experto en marketing digital para pequeñas empresas. Usa la consulta original y los resultados de búsqueda vectorial para crear una respuesta clara, accionable y fácil de formatear.

Consulta original: ${question}

Resultados similares encontrados:
${contextText}

Genera una respuesta con:
1. Resumen breve
2. Ideas concretas
3. Recomendaciones prácticas
4. Formato listo para mostrar en aplicación móvil.`;

  const result = await model.generateContent(longPrompt);
  const response = await result.response;
  return response.text();
}

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
    const { nombre,
      negocio,
      productos,
      ubicacion,
      descripcion,
      valores,
      impacto,
      redes,
      metas,
      usuario } = req.body;

    const result = await db.collection('negocio').insertOne({
      negocio,
      productos,
      ubicacion,
      descripcion,
      valores,
      impacto,
      redes,
      metas,
      usuario
    });

    console.log(result);

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

    res.status(201).json({ message: 'Usuario creado', _id: result.insertedId, nombre: nombre, correo: correo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/user/find', async (req, res) => {
  try {
    const db = await connectDB();
    const { correo, cont } = req.body;

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
    const business = await db.collection('negocio').findOne({ usuario: id });

    console.log(business);

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

app.post('/api/genai', async (req, res) => {
  const question = req.body.question;
  try {
         const suggestions = await quickGenerate(question);
         res.json({ suggestions });
     } catch (error) {
         res.status(500).json({ error: error.message });
     }
});

app.post('/api/gensuggest', async (req, res) => {
  const query = req.body.query;
  try {
    const suggestions = await longGenerate(query);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
