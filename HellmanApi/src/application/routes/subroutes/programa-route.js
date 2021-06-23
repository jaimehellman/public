'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../../services/controllers/programa-controller');
const authService = require('../../middleware/auth-service');

router.get('/', controller.get);
router.get('/ListarProgramas', controller.get);
router.get('/DetalharPrograma/:id', controller.getById);
router.post('/InserirPrograma', controller.insertPrograma);
router.post('/AtualizarPrograma', controller.updatePrograma);
router.post('/DeletarPrograma', controller.deletePrograma);

module.exports = router;