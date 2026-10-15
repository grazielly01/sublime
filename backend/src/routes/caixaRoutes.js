const { Router } = require('express');
const fluxoController = require('../controllers/fluxoController');
const caixaController = require('../controllers/caixaController');

const router = Router();

// Rota GET para consultar o Dashboard -> GET /api/dashboard?month=10&year=2026
router.get('/fluxo', fluxoController.getFluxoData);

// Rota POST para registar uma Entrada/Saída -> POST /api/transactions
router.post('/caixa', caixaController.create);

module.exports = router;