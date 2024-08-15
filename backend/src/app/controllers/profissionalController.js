  import profissionalRepository from '../repositories/profissionalRepository.js';

  class profissionalController {
      async index(req, res) {
          try {
              const result = await profissionalRepository.findAll();
              res.json(result);
          } catch (error) {
              res.status(500).json({ message: error.message });
          }
      }

      async Login(req, res) {
          try {
              const user = req.body;
              console.log('Login request body:', user);

              if (!user.email || !user.senha) {
                  return res.status(400).json({ message: 'Email e senha são obrigatórios' });
              }

              const result = await profissionalRepository.Login(user);
              if (result.length === 0) {
                  return res.status(404).json({ message: 'Usuário não encontrado' });
              }

              res.json(result);
          } catch (error) {
              console.error('Erro no login:', error);
              res.status(500).json({ message: 'Erro interno do servidor' });
          }
      }

      async show(req, res) {
          try {
              const id = req.params.id;
              const result = await profissionalRepository.findById(id);
              res.json(result);
          } catch (error) {
              res.status(500).json({ message: error.message });
          }
      }

      async store(req, res) {
          try {
              const user = req.body;
              const result = await profissionalRepository.create(user);
              res.json(result);
          } catch (error) {
              res.status(500).json({ message: error.message });
          }
      }

      async storeRoupa(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Nenhum arquivo foi enviado' });
            }
    
            const { userId, categoria } = req.body;
            if (!userId || !categoria) {
                return res.status(400).json({ message: 'Usuário e categoria são obrigatórios' });
            }
    
            // Construir a URL da imagem
            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            console.log("URL da imagem criada:", imageUrl); 
            
            const roupa = {
                userId,
                imagem_url: imageUrl,
                categoria
            };
    
            const result = await profissionalRepository.createRoupa(roupa);
            res.json(result);
        } catch (error) {
            console.error("Erro no storeRoupa:", error);
            res.status(500).json({ message: error.message });
            res.json({ imagem_url: imageUrl });

        }
    }

    async filterByCategory(req, res) {
        try {
            const { categoria } = req.params;
            
            if (!categoria) {
                return res.status(400).json({ message: 'Categoria é obrigatória' });
            }
    
            const roupas = await profissionalRepository.findRoupasByCategory(categoria);
            
            if (roupas.length === 0) {
                return res.status(404).json({ message: 'Nenhuma roupa encontrada para essa categoria' });
            }
    
            res.json(roupas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    

      async update(req, res) {
          try {
              const user = req.body;
              const id = req.params.id;
              const result = await profissionalRepository.update(user, id);
              res.json(result);
          } catch (error) {
              res.status(500).json({ message: error.message });
          }
      }

      async delete(req, res) {
          try {
              const id = req.params.id;
              const result = await profissionalRepository.delete(id);
              res.json(result);
          } catch (error) {
              res.status(500).json({ message: error.message });
          }
      }
  }

  export default new profissionalController();
