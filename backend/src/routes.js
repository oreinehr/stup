import { Router } from "express";
import profissionalController from "./app/controllers/profissionalController.js";
const router = Router();

//rotabase
router.get("/", (req, res) => {
  res.send("Servidor de rotas Ludemo Online.");
});

//rota de LOGIN
router.post("/login", (req, res) => {
  console.log("Solicitação de Login Recebida");
  profissionalController.login(req, res);
});

//para listar todas os profissionais
router.get("/profissionais/list", profissionalController.index);

//para criar um novo cadastro, enviando as info no corpo da requisição
router.post("/cadastro", profissionalController.store);

//para listar um profissional pelo id
router.get("/profissional/list/:id", profissionalController.show);

//para deletar um profissional pelo id
router.delete("/profissional/delete/:id", profissionalController.delete);

//para atualizar um profissional pelo id
router.put("/profissional/update/:id", profissionalController.update);

export default router;