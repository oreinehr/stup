import express from 'express';
import profissionalController from './app/controllers/profissionalController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const router = express.Router();

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
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

router.post("/upload", upload.single('image'), profissionalController.storeRoupa);

// Usar as rotas no app
app.use('/', router);

export default app;
