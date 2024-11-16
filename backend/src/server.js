import app from './app.js'; // Importando o app do arquivo app.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Servir a pasta uploads como estática
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));


app.listen(8080, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 8080');
  });
  
