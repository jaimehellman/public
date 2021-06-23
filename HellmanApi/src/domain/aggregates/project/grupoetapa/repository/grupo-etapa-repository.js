const Entity = require('../../../../../data/repository/entityjs');
const GrupoEtapa = require('../grupoetapa');
'use strict';
exports.getGrupoEtapa = async() => {
    entity = new Entity();
    return await entity.From(GrupoEtapa).GetAll();
}


exports.getById = async(id) => {
    entity = new Entity();
    return await entity.From(GrupoEtapa).GetById(id);
}

exports.insertGrupoEtapa = async(grupo) => {
    entity = new Entity();
    await entity.Insert(grupo);
}

exports.updateGrupoEtapa = async(grupo) => {
    entity = new Entity();
    await entity.Update(grupo);
}

exports.deleteGrupoEtapa = async(id) => {
    entity = new Entity();
    await entity.Delete(id);
}