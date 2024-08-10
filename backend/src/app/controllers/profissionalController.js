import profissionalRepository from '../repositories/profissionalRepository.js';
class profissionalController {
  async index(req, res) {
    try {
      const result = await profissionalRepository.findAll();
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async login(req, res) {
    try {
      const info = req.body;
      // console.log('Login request body:', info); // Adiciona log para verificar o corpo da requisição, checar se está vindo vazia do front

      if (!info.crp || !info.senha) {
        return res.status(400).json({ message: 'CRP e senha são obrigatórios' });
      }

      const result = await profissionalRepository.login(info);
      if (result.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.json(result);
    } catch (error) {
      console.error('Erro no login:', error); // Adiciona log para capturar detalhes do erro
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id;
      const result = await profissionalRepository.findById(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async store(req, res) {
    try {
      const info = req.body;
      const result = await profissionalRepository.create(info);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async update(req, res) {
    try {
      const info = req.body;
      const id = req.params.id;
      const result = await profissionalRepository.update(info, id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const result = await profissionalRepository.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default new profissionalController();