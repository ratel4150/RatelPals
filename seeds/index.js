// src/seeders/index.js

import seeder from 'mongoose-seeder'
import mongoose from 'mongoose';
import path from 'path'
import n from './userseeds/userSeeds.js';
//const data = require('./'); // Importa automáticamente todos los seeders en esta carpeta

mongoose.connect('mongodb+srv://prueba:1@cluster0.buo0t.mongodb.net/job?retryWrites=true&w=majority', { useNewUrlParser: true });

seeder.seed(n, { dropDatabase: true }).then(() => {
  console.log('Base de datos poblada con éxito.');
  mongoose.disconnect();
}).catch((error) => {
  console.error('Error al poblar la base de datos:', error);
});