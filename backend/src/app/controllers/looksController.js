// looksController.js
import profissionalRepository from '../repositories/profissionalRepository.js';

class looksController {

  async storeLook(req, res) {
  try {
    const { userId, title, clothes } = req.body;

    if (!userId || !title || !Array.isArray(clothes) || clothes.length === 0) {
      return res.status(400).json({ message: 'Usuário, título e roupas são obrigatórios' });
    }

    // Cria o look no banco de dados
    const newLook = await profissionalRepository.createLook({ userId, title });

    // Associa cada roupa ao look
    await profissionalRepository.addClothesToLook(newLook.id, clothes);

    res.status(201).json({ message: 'Look salvo com sucesso!', look: newLook });
  } catch (error) {
    console.error('Erro no storeLook:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao salvar o look' });
  }
}
};

export default new looksController();
