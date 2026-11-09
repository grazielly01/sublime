const { Router } = require('express');
const usuarioController = require('../controllers/usuarioController');
const senhaAut = require('../senhas/senhaAut');

const routes = Router();

// ROTAS PÚBLICAS (Não exigem autenticação)


// Rota para fazer login (retorna o token JWT)
routes.post('/login', usuarioController.login);

// Rota para criar/cadastrar um novo usuário
routes.post('/', usuarioController.criar);


// ROTAS PROTEGIDAS (Exigem o middleware senhaAut)


// Rota para listar todos os usuários cadastrados
routes.get('/', senhaAut, usuarioController.listar);

// Rota para buscar o perfil do usuário autenticado
routes.get('/perfil', senhaAut, usuarioController.perfil);

module.exports = routes;