
const { Router } = require('express');
const DashboardController = require('../controllers/dashboardController');

const routes = Router();

routes.get('/', DashboardController.obterVisaoGeral);
routes.put('/metas', DashboardController.atualizarMetas);

module.exports = routes;
