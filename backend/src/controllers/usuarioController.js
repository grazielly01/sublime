const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'sublime_chave_secreta';

class UsuarioController {
  async listar(req, res) {
     try {
      const usuarios = await prisma.usuario.findMany({
        orderBy: { id_usuario: 'desc' }
      });

      return res.json(usuarios.map((usuario) => ({
        id: usuario.id_usuario,
        nome: usuario.nome_usuario,
        email: usuario.email_usuario,
        cargo: usuario.cargo_usuario
      })));
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar usuários.', detalhes: error.message });
    }
  }

   async criar(req, res) {
    try {
      const { nome, email, senha, cargo } = req.body;

       if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
      }

       const usuarioExistente = await prisma.usuario.findFirst({
        where: { email_usuario: email }
      });

      if (usuarioExistente) {
        return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
      }

        const senhaHash = await bcrypt.hash(senha, 10);
      const novoUsuario = await prisma.usuario.create({
        data: {
          nome_usuario: nome,
          email_usuario: email,
          senha_usuario: senhaHash,
          cargo_usuario: cargo || 'Operador'
        }
      });

       return res.status(201).json({
        id: novoUsuario.id_usuario,
        nome: novoUsuario.nome_usuario,
        email: novoUsuario.email_usuario,
        cargo: novoUsuario.cargo_usuario
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário', detalhes: error.message });
    }
  }

   async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      }

            const usuario = await prisma.usuario.findFirst({
        where: { email_usuario: email }
      });

       if (!usuario || !await bcrypt.compare(senha, usuario.senha_usuario || '')) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
       const dadosUsuario = {
        id: usuario.id_usuario,
        nome: usuario.nome_usuario,
        email: usuario.email_usuario,
        cargo: usuario.cargo_usuario
      };

      const token = jwt.sign(

           { id: usuario.id_usuario, email: usuario.email_usuario },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

        return res.json({ usuario: dadosUsuario, token });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar login', detalhes: error.message });
    }
  }

  async perfil(req, res) {
     try {
      const id = req.usuario?.id;
      const email = req.usuario?.email;

      const usuario = id
        ? await prisma.usuario.findUnique({ where: { id_usuario: Number(id) } })
        : await prisma.usuario.findFirst({ where: { email_usuario: email } });

      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });

      return res.json({
        id: usuario.id_usuario,
        nome: usuario.nome_usuario,
        email: usuario.email_usuario,
        cargo: usuario.cargo_usuario
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar perfil.', detalhes: error.message });
    }
  }
}
