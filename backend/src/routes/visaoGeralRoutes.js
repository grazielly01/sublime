const { Router } = require('express');
const { obterResumoKpis } = require('../controllers/visaoGeralController');

const router = Router();

// Rota que fornece os números dos cards da Visão Geral
router.get('/resumo', obterResumoKpis);

module.exports = router;
