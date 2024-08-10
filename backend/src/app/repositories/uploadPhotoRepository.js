// backend/src/repositories/uploadPhotoRepository.js

import { query as _query } from '../database/conexao.js'; 

// Função para salvar a URL da foto na tabela roupas
const savePhotoUrl = async (userId, photoUrl, categoria) => {
    try {
        const query = 'INSERT INTO roupas (userId, imagem_url, categoria) VALUES (?, ?, ?)';
        await _query(query, [userId, photoUrl, categoria]);
    } catch (error) {
        console.error('Erro ao salvar a foto:', error);
        throw error;
    }
};

export default { savePhotoUrl };
