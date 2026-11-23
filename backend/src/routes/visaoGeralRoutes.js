
const { Router } = require('express');

const router = Router();

// Importa a função que calcula os indicadores
const { obterResumoKpis } = require('../controllers/visaoGeralController');

// Rota que fornece os números dos cards da Visão Geral
router.get('/resumo', obterResumoKpis);


//rota q fornece os números dos cards da Visão Geral
router.get("/resumo", obterResumoKpis);     

module.exports = Router;
