class UsuarioController {
  async listar(req, res) {
    return res.json([
      { id: 1, nome: "Usuário Teste 1" },
      { id: 2, nome: "Usuário Teste 2" }
    ]);
  }

  async criar(req, res) {
    const { nome, email } = req.body;
    return res.status(201).json({ 
      message: "Usuário criado (Simulação)", 
      dados: { nome, email } 
    });
  }
}

module.exports = new UsuarioController();

