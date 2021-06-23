'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../../services/controllers/grupo-etapa-controller');
const authService = require('../../middleware/auth-service');

router.get('/', controller.get);
router.get('/ListarGrupoEtapa', controller.get);
router.get('/DetalharGrupoEtapa/:id', controller.getById);
router.post('/InserirGrupoEtapa', controller.insertGrupoEtapa);
router.post('/AtualizarGrupoEtapa', controller.updateGrupoEtapa);
router.post('/DeletarGrupoEtapa', controller.deleteGrupoEtapa);

module.exports = router;