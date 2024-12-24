const { createWelcomeImage } = require("../../services/canvas");
const fs = require("fs");
const { PREFIX } = require("../../config");

module.exports = {
  name: "welcome-image",
  description: "Genera una imagen de bienvenida personalizada.",
  commands: [`${PREFIX}welcome`, `${PREFIX}bienvenida`],
  usage: `${PREFIX}welcome texto | descripción | URL_imagen`,
  handle: async ({ fullArgs, sendFile, sendText, sendReact }) => {
    try {
      // Validar si los argumentos están presentes
      if (!fullArgs || !fullArgs.includes("|")) {
        await sendReact("⚠️");
        return sendText(
          `Formato incorrecto.\n\nUsa: ${PREFIX}welcome texto | descripción | URL_imagen\n\nEjemplo:\n${PREFIX}welcome ¡Hola a todos! | Bienvenidos al grupo | https://example.com/imagen.jpg`
        );
      }

      // Dividir los argumentos en texto, descripción y URL
      const [text, description, imageURL] = fullArgs.split("|").map((arg) => arg.trim());

      if (!text || !description || !imageURL) {
        await sendReact("⚠️");
        return sendText(
          `Faltan parámetros.\n\nUsa: ${PREFIX}welcome texto | descripción | URL_imagen`
        );
      }

      // Generar la imagen
      const imageBuffer = await createWelcomeImage(text, description, imageURL);

      // Verificar si la generación fue exitosa
      if (!imageBuffer || !(imageBuffer instanceof Buffer)) {
        throw new Error("La función createWelcomeImage no devolvió un buffer válido.");
      }

      // Enviar la imagen generada
      await sendReact("✅");
      await sendFile(
        "Aquí está tu imagen de bienvenida generada:",
        imageBuffer,
        "welcome.jpg"
      );
    } catch (error) {
      console.error("Error en el comando welcome-image:", error);

      // Enviar mensaje de error al usuario
      await sendReact("❌");
      await sendText("Hubo un error al generar la imagen de bienvenida. Intenta nuevamente.");
    }
  },
};