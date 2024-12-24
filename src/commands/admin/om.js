const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const {
  activateReactionsGroup,
  deactivateReactionsGroup,
  getReactionsGroup,
  updateReactionsGroup,
} = require("../../utils/database");

module.exports = {
  name: "react-manager",
  description: "Gestiona reacciones basadas en palabras clave",
  commands: ["react-manager"],
  usage: `${PREFIX}react-manager (1/0) | ${PREFIX}react-manager add <palabra> <emoji> | ${PREFIX}react-manager remove <palabra>`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 Usa:\n- 1/0 para activar o desactivar las reacciones.\n- add <palabra> <emoji> para añadir reacciones.\n- remove <palabra> para eliminar reacciones."
      );
    }

    const command = args[0].toLowerCase();
    if (command === "1") {
      activateReactionsGroup(remoteJid);
      await sendSuccessReact();
      await sendReply("👻 Reacciones basadas en palabras clave *activadas*.");
    } else if (command === "0") {
      deactivateReactionsGroup(remoteJid);
      await sendSuccessReact();
      await sendReply("👻 Reacciones basadas en palabras clave *desactivadas*.");
    } else if (command === "add" && args.length === 3) {
      const keyword = args[1].toLowerCase();
      const emoji = args[2];
      const reactions = getReactionsGroup(remoteJid) || {};
      reactions[keyword] = emoji;
      updateReactionsGroup(remoteJid, reactions);
      await sendSuccessReact();
      await sendReply(`👻 Reacción añadida: *${keyword}* -> *${emoji}*.`);
    } else if (command === "remove" && args.length === 2) {
      const keyword = args[1].toLowerCase();
      const reactions = getReactionsGroup(remoteJid) || {};
      if (!reactions[keyword]) {
        throw new InvalidParameterError(`👻 La palabra *${keyword}* no tiene una reacción asignada.`);
      }
      delete reactions[keyword];
      updateReactionsGroup(remoteJid, reactions);
      await sendSuccessReact();
      await sendReply(`👻 Reacción eliminada para la palabra: *${keyword}*.`);
    } else {
      throw new InvalidParameterError(
        "👻 Comando no válido. Usa:\n- 1/0 para activar o desactivar.\n- add <palabra> <emoji> para añadir reacciones.\n- remove <palabra> para eliminarlas."
      );
    }
  },
};