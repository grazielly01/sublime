const prisma = require('../config/database');

class UsuarioController {
  // Lista todos os usuários do banco MySQL
  async listar(req, res) {
    try {
      const usuarios = await prisma.usuario.findMany();
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ 
        error: 'Erro ao buscar usuários', 
        detalhes: error.message 
      });
    }
  }

  // Cria um novo usuário no banco MySQL
  async criar(req, res) {
    try {
      const { nome, email } = req.body;

      // Validação básica para evitar requisições sem dados essenciais
      if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
      }

      const usuarioCriado = await prisma.usuario.create({
        data: {
          nome,
          email,
        },
      });

      return res.status(201).json(usuarioCriado);
    } catch (error) {
      // Trata o erro de email duplicado caso o email seja único no schema
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
      }

      return res.status(500).json({ 
        error: 'Erro ao criar usuário', 
        detalhes: error.message 
      });
    }
  }
}

module.exports = new UsuarioController();