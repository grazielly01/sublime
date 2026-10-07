const { Router } = require('express');
const estoqueController = require('../controllers/estoqueController');

const router = Router();

// GET /estoque -> Lista e calcula o alerta abaixo do mínimo
router.get('/', estoqueController.listar);

// POST /estoque -> Cadastra um novo insumo
router.post('/', estoqueController.criar);

module.exports = router;