const { Router } = require('express');
const calendarioController = require('../controllers/calendarioController'); 

const router = Router();

router.get('/', calendarioController.listar);
router.post('/', calendarioController.criar);
router.patch('/:id', calendarioController.atualizar);
router.put('/:id', calendarioController.atualizar);
router.delete('/:id', calendarioController.excluir);

module.exports = router;