const { createCanvas, loadImage } = require("canvas");

exports.createWelcomeImage = async (text, description, imageURL) => {
  if (!text || !description || !imageURL) {
    throw new Error("Es necesario proporcionar texto, descripción y URL de la imagen");
  }

  try {
    // Crear un canvas de 800x400
    const canvas = createCanvas(800, 400);
    const ctx = canvas.getContext("2d");

    // Cargar la imagen de fondo
    const background = await loadImage(imageURL);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Agregar el texto principal
    ctx.font = "bold 30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(text, 50, 300);

    // Agregar la descripción
    ctx.font = "20px Arial";
    ctx.fillStyle = "lightgray";
    ctx.fillText(description, 50, 350);

    // Retornar la imagen en formato Buffer
    return canvas.toBuffer();
  } catch (error) {
    console.error("Error al generar la imagen con canvas:", error);
    throw new Error("No se pudo generar la imagen.");
  }
};

exports.createCustomImage = async (options) => {
  const { width, height, text, textColor, bgColor } = options;
  if (!width || !height || !text) {
    throw new Error("Es necesario proporcionar el ancho, alto y texto.");
  }

  try {
    // Crear un canvas dinámico
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Establecer color de fondo
    ctx.fillStyle = bgColor || "black";
    ctx.fillRect(0, 0, width, height);

    // Dibujar el texto
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = textColor || "white";
    ctx.fillText(text, 10, 50);

    // Retornar la imagen en formato Buffer
    return canvas.toBuffer();
  } catch (error) {
    console.error("Error al crear una imagen personalizada:", error);
    throw new Error("No se pudo generar la imagen.");
  }
};