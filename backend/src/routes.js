import { Router } from "express";
import profissionalController from "./app/controllers/profissionalController.js";
import uploadPhotoController, { handleUploadPhoto, uploadPhoto } from "./app/controllers/uploadPhotoController.js";
const router = Router();

//rotabase
router.get("/", (req, res) => {
  res.send("Servidor de rotas Ludemo Online.");
});

//rota de LOGIN
router.post("/Login", (req, res) => {
  console.log("Solicitação de Login Recebida");
  profissionalController.Login(req, res);
});

//para listar todas os profissionais
router.get("/users/list", profissionalController.index);

//para criar um novo cadastro, enviando as info no corpo da requisição
router.post("/cadastro", profissionalController.store);

//para listar um profissional pelo id
router.get("/users/list/:id", profissionalController.show);

//para deletar um profissional pelo id
router.delete("/users/delete/:id", profissionalController.delete);

//para atualizar um profissional pelo id
router.put("/users/update/:id", profissionalController.update);

//rota para upload de fotos
router.post("/upload", uploadPhoto, handleUploadPhoto);

export default router;