const { dynamicCommand } = require("../utils/dynamicCommand");
const { loadCommonFunctions } = require("../utils/loadCommonFunctions");

exports.onMessagesUpsert = async ({ socket, messages }) => {
  if (!messages.length) {
    return;
  }

  for (const webMessage of messages) {
    const commonFunctions = loadCommonFunctions({ socket, webMessage });

    if (!commonFunctions) {
      continue;
    }

    await dynamicCommand(commonFunctions);
  }
};

const wordEmojiMap = {
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

module.exports = async ({ message, socket, remoteJid }) => {
  const text = message.text?.toLowerCase(); // Convertir mensaje a minúsculas.
  if (!text) return;

  for (const [word, emoji] of Object.entries(wordEmojiMap)) {
    if (text.includes(word)) {
      try {
        // Reaccionar al mensaje con el emoji.
        await socket.sendMessage(remoteJid, {
          react: {
            text: emoji,
            key: message.key,
          },
        });
      } catch (error) {
        console.error(`Error al reaccionar con "${emoji}" a "${word}":`, error);
      }
      break; // Detenerse después de reaccionar a la primera palabra encontrada.
    }
  }
};