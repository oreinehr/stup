import { consulta } from "../database/conexao.js";

class profissionalRepository {
    async create(user) {
        const sql = "INSERT INTO users SET ?";
        try {
            return await consulta(sql, user, 'Ocorreu um erro ao inserir o usuário');
        } catch (error) {
            throw new Error('Ocorreu um erro ao inserir o usuário');
        }
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
        return consulta(sql, [user.email, user.senha], 'Ocorreu um erro ao buscar o usuário');
      }

    
}

export default new profissionalRepository();
