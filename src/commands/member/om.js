const { PREFIX } = require("../../config");

module.exports = {
  name: "reacciones",
  description: "Reacciona con emojis a palabras específicas usando comandos.",
  commands: [
    "soky",
    "maicol",
    "olo",
    "stacy",
    "gigi",
    "diamantico",
    "hustle",
    "edwin",
    "alexander",
    "cameron",
    "krampus",
    "joan",
    "amor",
    "bb",
    "bebe",
    "mia",
    "cuero",
    "klk",
    "barry",
  ],
  usage: `${PREFIX}<comando>`,
  handle: async ({ command, message, sendReact }) => {
    // Mapeo de comandos a emojis
    const reactions = {
      soky: "🏳️‍🌈",
      maicol: "🛵",
      olo: "🎸",
      stacy: "🕊️",
      gigi: "🧚‍♀️",
      diamantico: "🥊",
      hustle: "🤥",
      edwin: "🦄",
      alexander: "🫎",
      cameron: "🦐",
      krampus: "🦇",
      joan: "👨🏾‍🦽",
      amor: "🫦",
      bb: "💋",
      bebe: "💋",
      mia: "👀",
      cuero: "🧚‍♀️",
      klk: "🇩🇴",
      barry: "🍄",
    };

    // Verificar si el comando es válido
    if (!reactions[command]) return;

    // Enviar la reacción al mensaje original
    await sendReact(message.key, reactions[command]);
  },
};
