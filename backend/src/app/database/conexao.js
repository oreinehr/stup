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

const saveItemToDatabase = (imageUrl, category) => {
  const query = 'INSERT INTO roupas (imagem_url, categoria) VALUES (?, ?)';
  connection.query(query, [imageUrl, category], (err, results) => {
    if (err) throw err;
    console.log('Item salvo com sucesso!');
  });
};

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
        console.error('erro', erro);
        return reject(new Error(mensagemReject));
      }

      const rows = JSON.parse(JSON.stringify(resultado));
     resolve(rows);
    
    });
  });
  
};

export default conexao;
