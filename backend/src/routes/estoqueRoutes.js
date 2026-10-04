const { Router } = require('express');
const estoqueController = require('../controllers/estoqueController');

const routes = Router();

routes.get('/', estoqueController.listar);

module.exports = routes;