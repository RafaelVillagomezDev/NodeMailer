const CryptoJS = require('crypto-js');
const env=require("dotenv").configDotenv();

const secretKeyEnv= env.parsed.PASSWORD_REQUEST
const passwordDecrypt=env.parsed.PASSWORD_DECRYPT
// Middleware para cifrar los encabezados y el cuerpo
const authMiddleware = (req, res, next) => {
    const { headers, body } = req;
    
    // Verificar la clave secreta
    const secretKey = secretKeyEnv; // Obtener la clave secreta del entorno
    const secretKeyHeader=req.headers["secret-key"]

    if (secretKey!=secretKeyHeader ) {
      return res.status(401).json({ error: 'No tienes autorizacion Api' });
    }

    // Generar una clave aleatoria para el cifrado
    const randomWord = CryptoJS.lib.WordArray.random(16);

    // Cifrar los encabezados
    const encabezadoOriginal = JSON.stringify(headers);
    const encabezadoCifrado = CryptoJS.AES.encrypt(encabezadoOriginal, passwordDecrypt, { iv: randomWord }).toString();
  
    // Establecer el encabezado cifrado en la solicitud
    req.headers['secret-key'] = encabezadoCifrado;
  
    // Cifrar el cuerpo
    const cuerpoOriginal = JSON.stringify(body);
    const cuerpoCifrado = CryptoJS.AES.encrypt(cuerpoOriginal, passwordDecrypt, { iv: randomWord }).toString();
  
    // Establecer el cuerpo cifrado en la solicitud
    req.body = cuerpoCifrado;
  
    next();
};


// Middleware para descifrar los encabezados y el cuerpo de la solicitud
const decryptAuthMiddleware = (req, res, next) => {
    const encabezadoCifrado = req.headers['secret-key'];
    const cuerpoCifrado = req.body;
  
    // Verificar si los encabezados cifrados o el cuerpo cifrado están presentes
    if (!encabezadoCifrado || !cuerpoCifrado) {
      return res.status(400).json({ error: 'Encabezados o cuerpo cifrados no encontrados en la solicitud' });
    }
  
    // Verificar la clave secreta
    const secretKey = secretKeyEnv; // Obtener la clave secreta del entorno



    try {
      // Descifrar los encabezados
      const bytesEncabezado = CryptoJS.AES.decrypt(encabezadoCifrado, passwordDecrypt);
      const encabezadoDescifrado = JSON.parse(bytesEncabezado.toString(CryptoJS.enc.Utf8));
      if (secretKey!=encabezadoDescifrado["secret-key"]) {
        return res.status(401).json({ error: 'No tienes autorizacion' });
      }
      // Establecer los encabezados descifrados en la solicitud
      req.headers = encabezadoDescifrado;
  
      // Descifrar el cuerpo
      const bytesCuerpo = CryptoJS.AES.decrypt(cuerpoCifrado, passwordDecrypt);
      const cuerpoDescifrado = JSON.parse(bytesCuerpo.toString(CryptoJS.enc.Utf8));
  
      // Establecer el cuerpo descifrado en la solicitud
      req.body = cuerpoDescifrado;
  
      next();
    } catch (error) {
      // Manejar el error de descifrado
      return res.status(400).json({ error: 'Error al descifrar los datos cifrados' });
    }
};

  
 module.exports ={authMiddleware,decryptAuthMiddleware};
  