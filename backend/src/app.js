import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import multer from 'multer'
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

app.use(cors());
//indicar para o express ler o body com json
app.use(express.json());

//usando o router do arquivo routes.js
app.use(routes);



export default app;