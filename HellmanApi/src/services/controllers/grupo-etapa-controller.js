const service = require('../../application/apps/grupo-etapa-app-service');
const GrupoEtapa = require('../../domain/aggregates/project/grupoetapa/grupoetapa');


exports.get = async(req, res, next) => {
    try {
        var data = await service.getGrupoEtapa();
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


exports.insertGrupoEtapa = async(req, res, next) => {
    try {
 
        var grupoetapa = new GrupoEtapa();
        grupoetapa.id_grupo_etapa = req.body.id_grupo_etapa;
        grupoetapa.name = req.body.name;
        await service.insertGrupoEtapa(grupoetapa);
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

exports.updateGrupoEtapa = async(req, res, next) => {
    try {
       var grupoetapa = new GrupoEtapa();
        grupoetapa.id_grupo_etapa = req.body.id_grupo_etapa;
        grupoetapa.name = req.body.name;
        await service.updateGrupoEtapa(grupoetapa);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.deleteGrupoEtapa = async(req, res, next) => {
    try {
        await service.deleteGrupoEtapa(res.body.id_grupo_etapa);
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};