const Entity = require('../../../../../data/repository/entityjs');
const Status = require('../status');
'use strict';
exports.getStatus = async() => {
    entity = new Entity();
    return await entity.From(Status).GetAll();
}


exports.getById = async(id) => {
    entity = new Entity();
    return await entity.From(Status).GetById(id);
}

exports.insertStatus = async(status) => {
    entity = new Entity();
    await entity.Insert(status);
}

exports.updateStatus = async(status) => {
    entity = new Entity();
    await entity.Update(status);
}

exports.deleteStatus = async(id) => {
    entity = new Entity();
    await entity.Delete(id);
}