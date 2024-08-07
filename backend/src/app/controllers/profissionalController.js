import profissionalRepository from "../repositories/profissionalRepository.js";

class profissionalController {
  async index(req, res) {
    const result = await profissionalRepository.findAll();
    res.json(result);
  }

  async show(req, res) {
    const id = req.params.id;
    const result = await profissionalRepository.findById(id);
    res.json(result);
  }

  async store(req, res) {
    const info = req.body;
    const result = await profissionalRepository.create(info);
    res.json(result);
  }

  async update(req, res) {
    const info = req.body;
    const id = req.params.id;
    const result = await profissionalRepository.update(info, id);
    res.json(result);
  }

  async delete(req, res) {
    //dizendo que o a const id é igual ao id fornecido na requisição
    const id = req.params.id;
    const result = await profissionalRepository.delete(id);
    res.json(result);
  }
}


export default new profissionalController();
