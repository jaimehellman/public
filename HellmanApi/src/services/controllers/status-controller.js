const service = require('../../application/apps/status-app-service');
const Status = require('../../domain/aggregates/project/status/status');
var config = require('../../config');


exports.get = async(req, res, next) => {
    try {
        var data = await service.getStatus();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await service.getById();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}


exports.insertStatus = async(req, res, next) => {
    try {
 
        var status = new Status();
        status.id_status = req.body.id_status;
        status.name = req.body.name;
        await service.insertStatus(status);
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.updateStatus = async(req, res, next) => {
    try {
        var status = new Status();
        status.id_status = req.body.id_status;
        status.name = req.body.name;
        await service.updateStatus(status);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.deleteStatus = async(req, res, next) => {
    try {
        await service.deleteStatus(res.body.id_status);
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};