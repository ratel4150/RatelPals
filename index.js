
//index.js
import express from "express";
import router from "./routes/index.js"; // Cambia la extensión a .mjs

import {logger} from "./lib/logger.js";


const app = express();
const port = process.env.PORT || 3000;

// Middleware para analizar datos JSON en el cuerpo de las solicitudes

app.use(express.json());

// Middleware para manejar CORS manualmente
app.use((req, res, next) => {
  // Configura las cabeceras CORS según tus necesidades
  res.header("Access-Control-Allow-Origin", "*"); // Permitir solicitudes desde cualquier origen
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  
  // Continúa con la ejecución normal del middleware
  next();
});

// Usar las rutas
app.use('/', router);

// Middleware para manejar errores 404 (Ruta no encontrada)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
  logger.error(err.stack); // Registrar el error con el logger
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(port, () => {

  logger.info(`Servidor escuchando en el puerto ${port}`);

});

