import mysql from "mysql";

const conexao = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Guireinehr02!",
  database: "db_stup2",
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1); // Encerra o processo se não conseguir conectar
  }
});

/**
 *
 * @param {string} sql input do sql pro banco de dados
 * @param {string = id | [user, id]} valores valores a serem passados ao sql
 * @param {string} mensagemReject mensagem de erro
 * @returns objeto da promise com os resultados
 */

  

export const consulta = (sql, valores = [], mensagemReject) => {
  return new Promise((resolve, reject) => {
      conexao.query(sql, valores, (erro, resultado) => {
          if (erro) {
              console.error('Erro na consulta:', erro);
              return reject(new Error(mensagemReject));
          }

          const rows = JSON.parse(JSON.stringify(resultado));
          console.log('Resultado da consulta:', rows); // Verifique este log
          resolve(rows);
      });
  });
};


export default conexao;