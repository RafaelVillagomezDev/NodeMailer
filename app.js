const express = require("express");
const bodyParser = require('body-parser');
const env=require("./utils/config")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port =  5000;
const nodeMailerRoutes=require("./routes/v1/SendMail")
app.use(env.API,nodeMailerRoutes);
app.listen(env.PORT, () => {
    console.log(`Server listening on port ${port}`);
});