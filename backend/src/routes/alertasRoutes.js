const { Router } = require('express');
const alertasController = require('../controllers/alertasController'); 

const router = Router();

// GET /alertas (Lista todos ou filtra por ?categoria=ESTOQUE)
router.get('/', alertasController.listar);

// DELETE /alertas/:id (Remove/dispensa um alerta)
router.delete('/:id', alertasController.dispensar);

module.exports = router;