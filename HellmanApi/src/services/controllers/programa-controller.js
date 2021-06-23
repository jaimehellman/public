var config = require('../../config');
const service = require('../../application/apps/programa-app-service');
const Programa = require('../../domain/aggregates/project/programa/programa');

exports.get = async(req, res, next) => {
    try {
        var data = await service.getPrograma();
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


exports.insertPrograma = async(req, res, next) => {
    try {
 
        var programa = new Programa();
        programa.id_programa = req.body.id_programa;
        programa.name = req.body.name;
        await service.insertPrograma(programa);
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

exports.updatePrograma = async(req, res, next) => {
    try {
        var programa = new Programa();
        programa.id_programa = req.body.id_programa;
        programa.name = req.body.name;
        await service.updatePrograma(programa);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.deletePrograma = async(req, res, next) => {
    try {
        await service.deletePrograma(res.body.id_programa);
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};