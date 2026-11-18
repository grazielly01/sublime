const { Router } = require('express');
const caixaController = require('../controllers/caixaController');

const router = Router();

router.get('/', caixaController.getAll);

router.get('/listar', caixaController.getAll);
router.get('/:id', caixaController.getById);

router.post('/', caixaController.create);
router.delete('/:id', caixaController.delete);

module.exports = router;