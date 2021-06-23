var config = require('../../config');
const service = require('../../application/apps/project-app-service');
const Project = require('../../domain/aggregates/project/project/project');



exports.get = async(req, res, next) => {
   
    try {
        var data = await service.getProject();
        res.status(200).send(data);
    } catch (e) {
        console.log(e);
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


exports.insertProject = async(req, res, next) => {
    try {
 
        var project = new Project();
        project.id_project = req.body.id_project;
        project.name = req.body.name;
        project.id_status = req.body.id_status;
        project.id_programa = req.body.id_programa;
        await service.insertProject(project);
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

exports.updateProject = async(req, res, next) => {
    try {
        var project = new Project();
        project.id_project = req.body.id_project;
        project.name = req.body.name;
        project.id_status = req.body.id_status;
        project.id_programa = req.body.id_programa;
        await service.updateProject(project);
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.deleteProject = async(req, res, next) => {
    try {
        await service.deleteProject(res.body.id_project);
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};