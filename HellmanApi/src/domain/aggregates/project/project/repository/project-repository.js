const Entity = require('../../../../../data/repository/entityjs');
const Projeto = require('../project');
'use strict';
exports.getProject = async() => {
    entity = new Entity();
    return await entity.From(Projeto).GetAll();
}


exports.getById = async(id) => {
    entity = new Entity();
    return await entity.From(Projeto).GetById(id);
}

exports.insertProject = async(project) => {
    entity = new Entity();
    await entity.Insert(project);
}

exports.updateProject = async(project) => {
    entity = new Entity();
    await entity.Update(project);
}

exports.deleteProject = async(id) => {
    entity = new Entity();
    await entity.Delete(id);
}