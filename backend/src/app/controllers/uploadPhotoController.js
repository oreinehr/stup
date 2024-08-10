// backend/src/controllers/uploadPhotoController.js

import { savePhotoUrl } from '../repositories/uploadPhotoRepository';
import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import { verify } from 'jsonwebtoken'; // Se estiver usando JWT para autenticação

// Configuração do multer para o upload de arquivos
const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer({ storage });

// Função para lidar com o upload e salvar a URL da foto
const uploadPhoto = async (req, res) => {
    try {
        if (!req.file || !req.body.categoria) {
            return res.status(400).send('Dados insuficientes para o upload.');
        }

        // Extrair o ID do usuário do token JWT (ajuste conforme seu método de autenticação)
        const token = req.headers.authorization.split(' ')[1]; // Assumindo "Bearer <token>"
        const decodedToken = verify(token, 'sua_chave_secreta'); // Verifique o token
        const userId = decodedToken.id; // ID do usuário decodificado do token

        const photoUrl = req.file.path; // Ajuste para o formato correto da URL
        const categoria = req.body.categoria; // Categoria fornecida pelo usuário
        
        await savePhotoUrl(userId, photoUrl, categoria);
        res.status(200).send('Foto enviada com sucesso!');
    } catch (error) {
        console.error('Erro ao processar o upload:', error);
        res.status(500).send('Erro ao processar o upload.');
    }
};

export default { upload, uploadPhoto };
