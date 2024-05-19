const nodemailer = require("nodemailer");
const env=require("../utils/config")

const sendMail = async (req, res, next) => {
  let config = {
    host:"smtp.gmail.com", // your email domain
    port: 465,
    secure: true,
    auth: {
      // type: 'OAuth2',
      user: env.EMAIL, // your email address
      pass: env.PASSWORD, // your password
      // clientId: env.CLIENT_ID,
      // clientSecret: env.CLIENT_SECRET,
      // refreshToken: env.TOKEN
    },
  };
  let transporter = nodemailer.createTransport(config);

  let message = {
    from: "test@gmail.com", // sender address
    to: "yandry75@gmail.com", // list of receivers
    subject: "Welcome to ABC Website!", // Subject line
    html: "<b>Hello world?</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "Email sent",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((err) => {
      return res.status(500).json({ msg: err });
    });
};

module.exports = {
  sendMail,
};
