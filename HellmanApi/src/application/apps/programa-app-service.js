const Programa = require('../../domain/aggregates/project/programa/programa');
const service = require('../../domain/aggregates/project/programa/services/programa-service');
var config = require('../../config');

exports.getPrograma = async() => {
    var data = null;
    
    try 
    {
        data = await service.getPrograma();
    }
    catch (e) 
    {
    }

    return data;
}

exports.getById = async(id_programa) => {
    var data = null;
    try 
    {
        data = await service.getById(id_programa);
    } 
    catch (e) 
    {
    }
}


exports.insertPrograma = async(programa) => {
    try 
    {
        await service.insertPrograma(programa);
    } 
    catch (e) 
    {
    }
}

exports.updatePrograma = async(programa) => {
    try 
    {
        await service.updatePrograma(programa);
        
    } catch (e) 
    {
    }
};

exports.deletePrograma = async(id_programa) => {
    try 
    {
        await service.deletePrograma(id_programa);

    } catch (e) 
    {
    }
};