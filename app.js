const express = require("express");
const env=require("dotenv").configDotenv()
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = env.parsed.PORT || 5000
const nodeMailerRoutes = require("./routes/v1/SendMail");
app.use(env.parsed.ROOT_API, nodeMailerRoutes);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
