'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../../services/controllers/status-controller');
const authService = require('../../middleware/auth-service');

router.get('/', controller.get);
router.get('/ListarStatus', controller.get);
router.get('/DetalharStatus/:id', controller.getById);
router.post('/InserirStatus', controller.insertStatus);
router.post('/AtualizarStatus', controller.updateStatus);
router.post('/DeletarStatus', controller.deleteStatus);

module.exports = router;