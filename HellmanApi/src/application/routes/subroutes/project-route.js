'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../../services/controllers/project-controller');
const authService = require('../../middleware/auth-service');

router.get('/', controller.get);
router.get('/ListarProjetos', controller.get);
router.get('/DetalharProjeto/:id', controller.getById);
router.post('/InserirProjeto', controller.insertProject);
router.post('/AtualizarProjeto', controller.updateProject);
router.post('/DeletarProjeto', controller.deleteProject);
//router.post('/DeletarProjeto', authService.isAdmin, controller.delete);

module.exports = router;