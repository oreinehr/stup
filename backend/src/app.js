import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const app = express();

const allowedOrigins = [
    'http://localhost:3000', // Desenvolvimento
    'https://stup-gamma.vercel.app' // Produção
];

// Configurar CORS dinamicamente com base na origem da requisição
app.use(cors({
    origin: (origin, callback) => {
        // Permitir origens específicas ou requests sem origem (Postman, ferramentas de teste)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Permitir envio de cookies ou autenticação
}));

app.options('*', cors()); // Preflight request para todas as rotas

app.use(express.json());

// Usando o router do arquivo routes.js
app.use(routes);

export default app;
