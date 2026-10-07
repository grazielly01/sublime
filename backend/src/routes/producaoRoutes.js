const { Router } = require('express');
const producaoController = require('../controllers/producaoController');

const router = Router();

// GET /producao -> Lista os KPIs e a Fila de Produção
router.get('/', producaoController.index);

// POST /producao -> Cria uma nova ordem (+ Nova ordem)
router.post('/', producaoController.criar);

// PATCH /producao/:id/status -> Altera o status (Iniciar / Concluir Lote)
router.patch('/:id/status', producaoController.atualizarStatus);

module.exports = router;