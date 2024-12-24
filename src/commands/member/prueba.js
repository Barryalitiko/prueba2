const { createWelcomeImage } = require("../../services/canvas");
const fs = require("fs");
const { PREFIX } = require("../../config");

module.exports = {
  name: "welcome-image",
  description: "Genera una imagen de bienvenida",
  commands: [`${PREFIX}welcome`, `${PREFIX}bienvenida`],
  usage: `${PREFIX}welcome texto | descripción | URL_imagen`,
  handle: async ({ fullArgs, sendFile, sendText, sendReact }) => {
    const [text, description, imageURL] = fullArgs.split("|").map((arg) => arg.trim());

    if (!text || !description || !imageURL) {
      await sendReact("⚠️");
      return sendText(
        `Formato incorrecto. Usa: ${PREFIX}welcome texto | descripción | URL_imagen`
      );
    }

    try {
      const imageBuffer = await createWelcomeImage(text, description, imageURL);
      await sendReact("✅");
      await sendFile(
        "Aquí está tu imagen de bienvenida generada:",
        imageBuffer,
        "welcome.jpg"
      );
    } catch (error) {
      console.error(error);
      await sendText("Hubo un error al generar la imagen de bienvenida.");
    }
  },
};