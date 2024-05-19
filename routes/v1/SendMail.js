var express = require('express');
var router = express.Router();
const mailerController=require("../../controller/mailerController")
const validateEmail=require("../../validators/email")

router.post("/send",validateEmail("send"),mailerController.sendMail)


module.exports=router