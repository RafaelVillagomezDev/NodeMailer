var express = require('express');
var router = express.Router();
const mailerController=require("../../controller/mailerController")
const validateEmail=require("../../validators/email")
const authMiddleware=require("../../middleware/authMiddleware")
router.post("/send",authMiddleware.authMiddleware,authMiddleware.decryptAuthMiddleware,validateEmail("send"),mailerController.sendMail)


module.exports=router