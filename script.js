// script.js
document.getElementById('asistente-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const pregunta = document.getElementById('pregunta').value;
    document.getElementById('respuesta').textContent = "Pensando...";
    document.getElementById('respuesta-container').style.display = 'block';

    try {
        const response = await fetch('https://TU_BACKEND_URL/preguntar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pregunta })
        });
        const data = await response.json();
        document.getElementById('respuesta').textContent = data.respuesta;
    } catch (err) {
        document.getElementById('respuesta').textContent = "Error al conectar con el asistente.";
    }
});