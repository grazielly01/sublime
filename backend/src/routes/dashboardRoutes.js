const { Router } = require('express');
const DashboardController = require('../controllers/dashboardController');
const { obterResumoKpis } = require('../controllers/visaoGeralController');

const routes = Router();

routes.get('/', DashboardController.obterVisaoGeral);
routes.get('/resumo', obterResumoKpis);
routes.put('/metas', DashboardController.atualizarMetas);

module.exports = routes;
