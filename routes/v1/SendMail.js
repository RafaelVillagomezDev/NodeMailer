var express = require('express');
var router = express.Router();
const mailerController=require("../../controller/mailerController")

router.post("/send",mailerController.sendMail)


module.exports=router