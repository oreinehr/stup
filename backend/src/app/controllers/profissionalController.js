import profissionalRepository from '../repositories/profissionalRepository.js';
import jwt from 'jsonwebtoken';
import removeBackground from '../../removeBgService.js'; // Importa o serviço para remover fundo
import path from 'path';    
const secretKey = 'chavinha1234';


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

            if (!user.email || !user.senha) {
                return res.status(400).json({ message: 'Email e senha são obrigatórios' });
            }

            const result = await profissionalRepository.Login(user);
            if (result.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const token = jwt.sign({ id: result[0].id }, secretKey, { expiresIn: '1h' });
            res.json({ token, userId: result[0].id });  
        } catch (error) {    
            console.error('Erro no Login:', error);
            res.status(500).json({ message: 'Erro ao realizar login' });
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
    
            // Caminho da imagem enviada
            const imagePath = req.file.path;
    
            // Construir a URL da imagem (sem remover o fundo)
            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${path.basename(imagePath)}`;
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
            res.status(500).json({ message: 'Ocorreu um erro ao inserir a roupa' });
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

    async getRoupas(req, res) {
        const { userId } = req.params;
        try {
            if (!userId) {
                return res.status(400).json({ message: 'User ID é obrigatório' });
            }
            const roupas = await profissionalRepository.findRoupasByUserId(userId);
            if (roupas.length === 0) {
                return res.status(404).json({ message: 'Nenhuma roupa encontrada para esse usuário' });
            }
            res.json(roupas);
        } catch (error) {
            console.error("Erro ao buscar roupas:", error);
            res.status(500).json({ message: 'Erro ao buscar roupas' });
        }
    }
    
    async deleteRoupa(req, res) {
        try {
            const id = req.params.id;
            const result = await profissionalRepository.deleteRoupa(id);
            
            if (result.affectedRows > 0) {
                res.json({ message: 'Roupa excluída com sucesso.' });
            } else {
                res.status(404).json({ message: 'Roupa não encontrada.' });
            }
        } catch (error) {
            console.error('Erro ao excluir roupa:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async recommendLook(req, res) {
        try {
            const { userId, evento } = req.body;
            if (!userId || !evento) {
                return res.status(400).json({ message: 'Usuário e tipo de evento são obrigatórios' });
            }

            // Obter todas as roupas do usuário
            const roupas = await profissionalRepository.findRoupasByUserId(userId);

            // Gerar a recomendação de look
            const lookRecomendado = generateLookRecommendation(roupas, evento);

            res.json(lookRecomendado);
        } catch (error) {
            console.error("Erro ao recomendar look:", error);
            res.status(500).json({ message: 'Erro ao recomendar look' });
        }
    }
    async saveLook(req, res) {
        try {
            const { title, clothes, userId } = req.body;
    
            if (!title || !clothes || clothes.length === 0 || !userId) {
                return res.status(400).json({ message: 'Título do look, roupas e userId são obrigatórios' });
            }
    
            // Criação do look no banco
            const look = { title, userId };
            const createdLook = await profissionalRepository.createLook(look);
    
            // Verifica se o look foi criado com sucesso
            if (!createdLook.insertId) {
                return res.status(500).json({ message: 'Erro ao criar o look no banco de dados' });
            }
    
            const lookId = createdLook.insertId;
    
            // Associa as roupas ao look criado
            await profissionalRepository.associateClothesToLook(lookId, clothes);
    
            res.json({ message: 'Look salvo com sucesso!', lookId });
        } catch (error) {
            console.error("Erro ao salvar look:", error);
            res.status(500).json({ message: 'Erro ao salvar o look' });
        }
    }


    
    
}





export default new profissionalController();
