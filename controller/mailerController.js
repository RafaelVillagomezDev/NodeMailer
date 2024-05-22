const env=require("dotenv").configDotenv();
const nodemailer=require("nodemailer")
const { validationResult, matchedData } = require("express-validator");

const sendMail = async (req, res, next) => {


  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req); //Saneo

    const dataBody = { ...req};
    const {email,subject,messague} = dataBody;

    let config = {
      host: "smtp.gmail.com", // your email domain
      port: 465,
      secure: true,
      auth: {
        // type: 'OAuth2',
        user:env.parsed.EMAIL, // your email address
        pass:env.parsed.PASSWORD, // your password
        // clientId: env.CLIENT_ID,
        // clientSecret: env.CLIENT_SECRET,
        // refreshToken: env.TOKEN
      },
    };
    let transporter = nodemailer.createTransport(config);
  
    let message = {
      from:env.parsed.EMAIL, // sender address
      to: env.parsed.EMAIL, // list of receivers
      sender:email,
      subject: subject, // Subject line
      html: `<p>${messague}</p>
            <p>Remitente: ${email}</p>`, // html body
    }; 
 
   
    const info = await transporter.sendMail(message);
    res.status(201).json({
      msg: "Email sent",
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
