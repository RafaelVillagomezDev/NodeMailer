var express = require('express');
var router = express.Router();
const mailerController=require("../../controller/mailerController")
const validateEmail=require("../../validators/email")
const authMiddleware=require("../../middleware/authMiddleware")
router.post("/generateToken",validateEmail("send"),authMiddleware.generateToken)
router.post("/send",validateEmail("send"),authMiddleware.verifyToken,mailerController.sendMail)


module.exports=router