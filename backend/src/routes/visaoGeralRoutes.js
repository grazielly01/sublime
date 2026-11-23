
const { Router } = require('express');

const router = Router();

// Importa a função que calcula os indicadores
const { obterResumoKpis } = require('../controllers/visaoGeralController');

// Rota que fornece os números dos cards da Visão Geral
router.get('/resumo', obterResumoKpis);

// Exporta as rotas
module.exports = router;
