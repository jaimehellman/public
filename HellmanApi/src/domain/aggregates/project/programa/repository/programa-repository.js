const Entity = require('../../../../../data/repository/entityjs');
const Programa = require('../programa');
'use strict';
exports.getPrograma = async() => {
    entity = new Entity();
    return await entity.From(Programa).GetAll();
}


exports.getById = async(id) => {
    entity = new Entity();
    return await entity.From(Programa).GetById(id);
}

exports.insertPrograma = async(programa) => {
    entity = new Entity();
    await entity.Insert(programa);
}

exports.updatePrograma = async(programa) => {
    entity = new Entity();
    await entity.Update(programa);
}

exports.deletePrograma = async(id) => {
    entity = new Entity();
    await entity.Delete(id);
}