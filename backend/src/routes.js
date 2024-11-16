import express from 'express';
import profissionalController from './app/controllers/profissionalController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import formidable from 'formidable';
import looksController from './app/controllers/looksController.js';
import fs from 'fs';

const BASE_URL = 'https://backend-solitary-forest-6306.fly.dev';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const router = express.Router();

const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log('Pasta uploads criada.');
}

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')); // A pasta onde a imagem é salva
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nome único para cada arquivo
  }
});

const upload = multer({ storage });

// Configuração do middleware para servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Rotas
router.get("/", (req, res) => {
  res.send("Servidor On");
});

router.post("/login", profissionalController.Login);
router.get("/users/list", profissionalController.index);
router.post("/cadastro", profissionalController.store);
router.get("/users/list/:id", profissionalController.show);
router.delete("/users/delete/:id", profissionalController.delete);
router.put("/users/update/:id", profissionalController.update);

// Alteração na rota para usar o `profissionalController.storeRoupa`
router.post('/roupas/upload', upload.single('image'), profissionalController.storeRoupa);

router.get('/roupas/:userId', profissionalController.getRoupas);
router.delete('/roupas/:id', profissionalController.deleteRoupa.bind(profissionalController));

app.post('/api/removebg', upload.single('image'), async (req, res) => {
  const formData = new FormData();
  formData.append('image_file', req.file.buffer, req.file.originalname);
  formData.append('size', 'auto');

  try {
    const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      headers: {
        'X-Api-Key': 'WJUxsp9sviKJwd4wJNxUNvqe',
        ...formData.getHeaders(),
      },
      responseType: 'arraybuffer',
    });

    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error('Erro ao processar imagem:', error.response?.data || error.message);
    res.status(500).json({ message: 'Erro ao processar imagem.' });
  }
});

router.post('/looks', looksController.storeLook);

// Usar as rotas no app
app.use('/', router);

export default app;
