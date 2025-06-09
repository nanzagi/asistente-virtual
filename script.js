const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static')); // Para servir CSS y otros archivos estáticos

const configuration = new Configuration({
    apiKey: 'TU_API_KEY', // Reemplaza con tu clave real
});
const openai = new OpenAIApi(configuration);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

async function generarRespuesta(pregunta) {
    const prompt = "Eres un asistente virtual experto en didáctica de las matemáticas. Ayuda a un profesor a mejorar sus diseños de clase sobre razón y proporción, teniendo en cuenta las dificultades comunes de los niños. Pregunta del profesor: " + pregunta;
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 200
    });
    return completion.data.choices[0].text.trim();
}

app.get('/', (req, res) => {
    res.render('index', { respuesta: "" });
});

app.post('/', async (req, res) => {
    const pregunta = req.body.pregunta;
    let respuesta = "";
    if (pregunta) {
        respuesta = await generarRespuesta(pregunta);
    }
    res.render('index', { respuesta });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});