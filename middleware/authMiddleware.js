const CryptoJS = require("crypto-js");
const env = require("dotenv").configDotenv();
const jwt = require("jsonwebtoken");
const { validationResult, matchedData } = require("express-validator");

const secretKeyEnv = env.parsed.PASSWORD_REQUEST;

// Middleware para cifrar los encabezados y el cuerpo
const generateToken = (req, res, next) => {
  try {
    const dataBody = { ...req.body };
    const { email, subject, messague } = dataBody;
    // Validar que todos los campos están presentes
    if (!email || !subject || !messague) {
      return res.status(400).json({ messague: "Faltan campos en el envio" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    req = matchedData(req); //Saneo

    const payload = {
      email: email,
      subject: subject,
      messague: messague,
    };

    // Generar el token
    const token = jwt.sign(payload, secretKeyEnv, { expiresIn: "1h" });

    // Enviar el token al cliente
    res.json({ token: token });
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Middleware para descifrar los encabezados y el cuerpo de la solicitud
const verifyToken = (req, res, next) => {
  // Obtener el token del header 'secret-key'
  const token = req.headers['secret-key'];

  // Verificar si existe el token
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  // Verificar el token JWT
  jwt.verify(token, secretKeyEnv, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
    // Si el token es válido, puedes almacenar la información decodificada en el objeto 'req' para su uso posterior
    req.body = decoded;
    next(); // Continuar con la ejecución de las siguientes funciones middleware o rutas
  });
};

module.exports = { generateToken, verifyToken };
