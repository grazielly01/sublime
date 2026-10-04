const { Router } = require('express');
const DashboardController = require('../controllers/dashboardController');

const routes = Router();

// GET /dashboard
routes.get('/', DashboardController.obterVisaoGeral);

module.exports = routes;