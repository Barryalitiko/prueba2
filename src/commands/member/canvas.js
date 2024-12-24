const { createCanvas, loadImage } = require('canvas');
const { PREFIX } = require('../../config');

module.exports = {
  name: 'canvas-test',
  description: 'Prueba de Canvas',
  usage: `${PREFIX}canvas-test`,
  handle: async ({ sendImage, sendReply }) => {
    console.log('Iniciando comando canvas-test');

    try {
      // Crear un canvas vacío
      console.log('Creando canvas...');
      const canvas = createCanvas(400, 200);
      console.log('Canvas creado');

      // Obtener el contexto del canvas
      console.log('Obteniendo contexto del canvas...');
      const ctx = canvas.getContext('2d');
      console.log('Contexto del canvas obtenido');

      // Agregar texto al canvas
      console.log('Agregando texto al canvas...');
      ctx.font = '30px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText('¡Hola, mundo!', 20, 100);
      console.log('Texto agregado al canvas');

      // Agregar un rectángulo al canvas
      console.log('Agregando rectángulo al canvas...');
      ctx.fillStyle = 'red';
      ctx.fillRect(50, 50, 100, 100);
      console.log('Rectángulo agregado al canvas');

      // Generar la imagen como buffer
      console.log('Generando imagen como buffer...');
      const buffer = canvas.toBuffer();
      console.log('Imagen generada como buffer');

      // Enviar la imagen como respuesta
      console.log('Enviando imagen como respuesta...');
      await sendImage(buffer, 'image.png');
      console.log('Imagen enviada como respuesta');
    } catch (error) {
      console.error('Error al generar imagen:', error);
      await sendReply('Error al generar imagen');
    }
  },
};
