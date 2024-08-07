import { Router } from "express";
import profissionalController from "./app/controllers/profissionalController.js";
const router = Router();

//rotabase
router.get("/", (req, res) => {
  res.send("Servidor de rotas Ludemo Online.");
});

//para listar todas os profissionais
router.get("/profissionais/list", profissionalController.index);

//para criar um novo cadastro, enviando as info no corpo da requisição
/*

{
  "crp" : "3453452",
  "nome" : "teste",
  "senha" : "senhatestse",
  "email" : "guilhermedsmarta@gmail.com"
}
*/
router.post("/cadastro", profissionalController.store);

//para listar um profissional pelo id
router.get("/profissional/list/:id", profissionalController.show);

//para deletar um profissional pelo id
router.delete("/profissional/delete/:id", profissionalController.delete);

//para atualizar um profissional pelo id
router.put("/profissional/update/:id", profissionalController.update);



export default router;
