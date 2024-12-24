const ytdl = require('ytdl');

// Función para obtener la URL de descarga de un video de YouTube
exports.getVideoStream = (url) => {
  if (!ytdl.validateURL(url)) {
    throw new Error("La URL proporcionada no es válida.");
  }

  // Devuelve el stream de audio
  return ytdl(url, {
    filter: 'audioonly', // Solo audio
    quality: 'highestaudio',
  });
};

// Función para obtener información sobre el video
exports.getVideoInfo = async (url) => {
  if (!ytdl.validateURL(url)) {
    throw new Error("La URL proporcionada no es válida.");
  }

  const info = await ytdl.getInfo(url);
  return info;
};