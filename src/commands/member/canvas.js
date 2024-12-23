const { createCanvas } = require('canvas');

module.exports = {
  name: 'canvas', // Nombre del comando
  description: 'Genera una imagen con Canvas y la envía', // Descripción del comando
  async execute(message, client) {
    // Crear un lienzo de 300x300 píxeles
    const canvas = createCanvas(300, 300);
    const ctx = canvas.getContext('2d');

    // Rellenar el fondo con color blanco
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar un rectángulo verde
    ctx.fillStyle = 'green';
    ctx.fillRect(50, 50, 200, 200);

    // Dibujar un círculo rojo
    ctx.beginPath();
    ctx.arc(150, 150, 80, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Convertir la imagen a un buffer para enviarla como imagen en WhatsApp
    const buffer = canvas.toBuffer('image/png');

    // Enviar la imagen como mensaje en el chat de WhatsApp
    await client.sendMessage(message.from, { 
      caption: 'Aquí está tu imagen generada con Canvas', 
      image: buffer 
    });

    console.log('Imagen enviada correctamente');
  },
};
