const { Router } = require('express');
const usuarioController = require('../controllers/usuarioController');

const routes = Router();

routes.get('/usuarios', usuarioController.listarUsuarios);
routes.post('/usuarios', usuarioController.criarUsuario);

module.exports = routes;
