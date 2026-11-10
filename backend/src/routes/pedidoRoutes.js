const { Router } = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = Router();

// GET /pedidos -> Lista todos ou filtra por ?status=AGUARDANDO
router.get('/', pedidoController.listar);

// POST /pedidos -> Cadastra um novo pedido
router.post('/', pedidoController.criar);

// PATCH /pedidos/:id/status -> Altera o status do pedido
router.patch('/:id/status', pedidoController.atualizarStatus);

module.exports = router;