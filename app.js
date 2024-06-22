const express = require("express");
const env=require("dotenv").configDotenv()
const bodyParser = require("body-parser");
const app = express();


const whitelist = ['http://yandrydev.es', 'https://yandrydev.es'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};


// Habilitar CORS para todos los orígenes
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = env.parsed.PORT
const nodeMailerRoutes = require("./routes/v1/SendMail");
app.use(`/api/v1/`, nodeMailerRoutes);
app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
  console.log(`API is accessible at http://yandrydev.es:${port}/api/v1/`);  
});
