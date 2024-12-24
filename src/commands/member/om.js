const { PREFIX } = require("../../config"); // Prefijo personalizado, por ejemplo: "#"

const reactions = [
  { match: "soky", reaction: "🏳️‍🌈" },
  { match: "maicol", reaction: "🛵" },
  { match: "olo", reaction: "🎸" },
  { match: "stacy", reaction: "🕊️" },
  { match: "gigi", reaction: "🧚‍♀️" },
  { match: "diamantico", reaction: "🥊" },
  { match: "hustle", reaction: "🤥" },
  { match: "edwin", reaction: "🦄" },
  { match: "alexander", reaction: "🫎" },
  { match: "cameron", reaction: "🦐" },
  { match: "krampus", reaction: "🦇" },
  { match: "joan", reaction: "👨🏾‍🦽" },
  { match: "amor", reaction: "🫦" },
  { match: "bb", reaction: "💋" },
  { match: "bebe", reaction: "💋" },
  { match: "mia", reaction: "👀" },
  { match: "cuero", reaction: "🧚‍♀️" },
  { match: "klk", reaction: "🇩🇴" },
  { match: "barry", reaction: "🍄" },
];

module.exports = {
  name: "reaction",
  description: "Reacciona a palabras clave específicas con prefijo",
  handle: async ({ message, sendReact }) => {
    const text = message.text?.toLowerCase(); // Convertir el mensaje a minúsculas
    if (!text) return;

    // Verificar si el mensaje contiene el prefijo seguido de una palabra clave
    if (text.startsWith(PREFIX)) {
      const keyword = text.slice(PREFIX.length).trim(); // Extraer la palabra clave después del prefijo
      const reaction = reactions.find((r) => r.match === keyword);

      if (reaction) {
        try {
          // Reaccionar usando sendReact
          await sendReact(reaction.reaction);
        } catch (error) {
          console.error(
            `Error al reaccionar con "${reaction.reaction}" a "${reaction.match}":`,
            error
          );
        }
      }
    }
  },
};