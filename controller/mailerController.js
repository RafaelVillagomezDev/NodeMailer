const env=require("dotenv").configDotenv();
const nodemailer=require("nodemailer")
const { validationResult, matchedData } = require("express-validator");

const sendMail = async (req, res, next) => {
  try {
   
    const dataBody = req.body; 
    const { email, subject, messague } = dataBody;

    let config = {
      host: "smtp.gmail.com", // tu dominio de email
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL, // tu dirección de correo electrónico
        pass: process.env.PASSWORD, // tu contraseña
      },
    };

    let transporter = nodemailer.createTransport(config);

    let message = {
      from: process.env.EMAIL, // dirección del remitente
      to: process.env.EMAIL, // lista de destinatarios
      sender: email,
      subject: subject, // línea de asunto
      html: `<p>${messague}</p>
            <p>Remitente: ${email}</p>`, // cuerpo del correo en html
    };

    const info = await transporter.sendMail(message);
    res.status(201).json({
      msg: "Correo enviado",
      info: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  sendMail,
};
