import express from 'express';
import profissionalController from './app/controllers/profissionalController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import formidable from 'formidable';
import looksController from './app/controllers/looksController.js';


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

router.get("/roupas/:userId", profissionalController.getRoupas);

router.delete('/roupas/:id', profissionalController.deleteRoupa.bind(profissionalController));
app.post('/remove-background', (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
      if (err) {
          return res.status(400).send('Erro ao processar a requisição.');
      }

      const file = files.image; // Assumindo que o arquivo de imagem é enviado com o nome 'image'

      try {
          const outputFilePath = './uploads/processed_image.png'; // Caminho para salvar a imagem processada

          // Removendo o fundo da imagem
          await removeBackgroundFromImageFile({
              path: file.path,
              apiKey: 'REMOVE_BG_API_KEY', // Substitua pela sua chave de API
              size: 'auto',
              outputFile: outputFilePath,
          });

          // Lê a imagem processada e envia como resposta
          const processedImage = fs.readFileSync(outputFilePath);
          res.set('Content-Type', 'image/png');
          res.send(processedImage);

          // Opcional: Remover o arquivo processado após o envio
          fs.unlinkSync(outputFilePath);
      } catch (error) {
          console.error('Erro ao remover fundo da imagem:', error);
          res.status(500).send('Erro ao processar a imagem.');
      }
  });
});
router.post('/looks', looksController.storeLook);


// Usar as rotas no app
app.use('/', router);

export default app;
