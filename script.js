// backend/index.js
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: 'TU_API_KEY', // Pon aquí tu clave de OpenAI
});
const openai = new OpenAIApi(configuration);

app.post('/preguntar', async (req, res) => {
  const { pregunta } = req.body;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Eres un asistente virtual experto en didáctica de las matemáticas. Ayuda a un profesor a mejorar sus diseños de clase sobre razón, proporción y linealidad, considerando las dificultades de los estudiantes. Pregunta: ${pregunta}`,
      max_tokens: 200,
    });
    res.json({ respuesta: completion.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ respuesta: "Error al consultar la IA." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));