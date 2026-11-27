const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Chave secreta para assinar o JWT (ideal guardar em variável de ambiente no .env)
const JWT_SECRET = process.env.JWT_SECRET || 'sublime_chave_secreta_super_segura';

// Array mockado em memória
let usuariosMock = [
  {
    id: 1,
    nome: "Administrador Sublime",
    email: "admin@sublime.com",
    // Senha padrão em hash para '123456'
    senha: "$2a$10$e81T2S.VqK7Y/S4aI0YQxOHmZ7A20B76A0v4171I97/W40x35iX4K", 
    cargo: "Gerente Geral"
  }
];

class UsuarioController {
  // 1. Lista todos os usuários (sem expor a senha)
  async listar(req, res) {
    const listaSemSenha = usuariosMock.map(({ senha, ...resto }) => resto);
    return res.json(listaSemSenha);
  }

  // 2. Registra um novo usuário com senha CRIPTOGRAFADA
  async criar(req, res) {
    try {
      const { nome, email, senha, cargo } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
      }

      // Verifica se o e-mail já existe
      const usuarioExistente = usuariosMock.find(u => u.email === email);
      if (usuarioExistente) {
        return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
      }

      // Criptografa a senha com salt de 10 rodadas
      const senhaHash = await bcrypt.hash(senha, 10);

      const novoUsuario = {
        id: usuariosMock.length + 1,
        nome,
        email,
        senha: senhaHash,
        cargo: cargo || 'Operador'
      };

      usuariosMock.push(novoUsuario);

      // Retorna os dados do usuário sem a senha
      const { senha: _, ...usuarioRetorno } = novoUsuario;
      return res.status(201).json(usuarioRetorno);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário', detalhes: error.message });
    }
  }

  // 3. Autenticação/Login gerando Token JWT
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      }

      // Busca o usuário pelo e-mail
      const usuario = usuariosMock.find(u => u.email === email);
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      // Compara a senha informada com a hash salva
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      // Gera o Token JWT válido por 8 horas
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      const { senha: _, ...dadosUsuario } = usuario;

      return res.json({
        usuario: dadosUsuario,
        token
      });

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar login', detalhes: error.message });
    }
  }

  // 4. Retorna o perfil do usuário logado
  async perfil(req, res) {
    // Como mock, retorna o primeiro usuário sem a senha
    const { senha, ...usuarioPerfil } = usuariosMock[0];
    return res.json(usuarioPerfil);
  }
}

module.exports = new UsuarioController();
module.exports = new UsuarioController();
