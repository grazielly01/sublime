
const { Router } = require('express');
const estoqueController = require('../controllers/estoqueController');

const router = Router();

// Listar
router.get('/', estoqueController.listar);

// Cadastrar
router.post('/', estoqueController.criar);

// Editar
router.put('/:id', estoqueController.atualizar);

// Excluir
router.delete('/:id', estoqueController.excluir);

module.exports = router;
