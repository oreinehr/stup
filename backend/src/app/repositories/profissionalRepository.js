import { consulta } from "../database/conexao.js";
import conexao from "../database/conexao.js";

class profissionalRepository {

    async create(user) {
        const sql = "INSERT INTO users SET ?";
        try {
            return await consulta(sql, user, 'Ocorreu um erro ao inserir o usuário');
        } catch (error) {
            throw new Error('Ocorreu um erro ao inserir o usuário');
        }
    }

    async createRoupa(roupa) {
        const sql = "INSERT INTO roupas SET ?";
        try {
            const result = await consulta(sql, roupa, 'Ocorreu um erro ao inserir a roupa');
            // Se precisar do ID inserido:
            return { id: result.insertId, ...roupa };
        } catch (error) {
            console.error('Erro ao inserir roupa:', error);
            throw new Error('Ocorreu um erro ao inserir a roupa');
        }
    }

    async findRoupasByCategory(categoria) {
        const query = 'SELECT * FROM roupas WHERE categoria = ?';
        const [rows] = await db.query(query, [categoria]);
        return rows;
    }
    
    
    async findAll() {
        const sql = "SELECT * FROM users";
        try {
            return await consulta(sql, [], 'Ocorreu um erro ao buscar todos os usuários');
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar todos os usuários');
        }
    }

    async findById(id) {
        const sql = "SELECT * FROM users WHERE id=?";
        try {
            return await consulta(sql, [id], 'Ocorreu um erro ao buscar o usuário');
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar o usuário');
        }
    }

    async update(user, id) {
        const sql = "UPDATE users SET ? WHERE id=?";
        try {
            return await consulta(sql, [user, id], 'Ocorreu um erro ao atualizar o usuário');
        } catch (error) {
            throw new Error('Ocorreu um erro ao atualizar o usuário');
        }
    }

    async delete(id) {
        const sql = "DELETE FROM users WHERE id=?";
        try {
            return await consulta(sql, [id], 'Ocorreu um erro ao deletar o usuário');
        } catch (error) {
            throw new Error('Ocorreu um erro ao deletar o usuário');
        }
    }

    async Login(user) {
        const sql = "SELECT * FROM users WHERE email = ? AND senha = ?";
        try {
            return await consulta(sql, [user.email, user.senha], 'Ocorreu um erro ao realizar o login');
        } catch (error) {
            throw new Error('Ocorreu um erro ao realizar o login');
        }
    }

    async findRoupasByUserId(userId) {
        const sql = 'SELECT * FROM roupas WHERE userId = ?';
        const results = await consulta(sql, [userId]);
        console.log(results); // Adicione esse log para ver o retorno
        return results;
    }
    
    async deleteRoupa(id) {
        const sql = "DELETE FROM roupas WHERE id = ?";
        try {
            const result = await consulta(sql, [id], 'Ocorreu um erro ao deletar a roupa');
            return result; // Retorna o resultado da operação
        } catch (error) {
            console.error("Erro ao deletar roupa:", error);
            throw new Error('Erro ao deletar roupa');
        }
    }
    
    async createLook(data) {
        try {
          const newLook = await Look.create(data);
          return newLook;
        } catch (error) {
          throw new Error('Erro ao criar look: ' + error.message);
        }
      }
    
      // Método para associar roupas a um look
      async addClothesToLook(lookId, clothesIds) {
        try {
          const lookRoupas = clothesIds.map(roupaId => ({
            lookId,
            roupaId
          }));
          await LookRoupa.bulkCreate(lookRoupas);
        } catch (error) {
          throw new Error('Erro ao associar roupas ao look: ' + error.message);
        }
      }
    };    


export default new profissionalRepository();
