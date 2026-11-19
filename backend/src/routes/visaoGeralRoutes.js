const { Router } = require('express');
const visaoGeralController = require('../controllers/visaoGeralController');

const router = Router();

// importa a function qe calcula os indicadores da tela Visão Geral
const { obterResumoKpis } = require("../controllers/visaoGeralController");

//rota q fornece os números dos cards da Visão Geral
router.get("/resumo", obterResumoKpis);