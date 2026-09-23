const { Router } = require('express');
const usuarioController = require('../controllers/usuarioController');

const routes = Router();

routes.get('/usuarios', usuarioController.listar);
routes.post('/usuarios', usuarioController.criar);

module.exports = routes;
