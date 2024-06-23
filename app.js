const express = require("express");
const env=require("dotenv").configDotenv()
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const whitelist = ['http://yandrydev.es', 'https://yandrydev.es'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Acceso no permitido por CORS'));
    }
  }
};



// Habilitar CORS para todos los orígenes
app.use(cors(corsOptions));

// Middleware de Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 3, // límite máximo de 2 solicitudes por IP
  message: { message: 'Has excedido el límite de peticiones. Inténtalo de nuevo más tarde.' }, 
  statusCode: 429, 
  headers: true, 

});


// Aplicar el middleware de Rate Limit a todas las solicitudes
app.use(limiter);

// Middleware para manejar errores de Rate Limit


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = env.parsed.PORT
const nodeMailerRoutes = require("./routes/v1/SendMail");
app.use(`/api/v1/`, nodeMailerRoutes);
app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
  
});
