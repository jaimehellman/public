const Programa = require('../../domain/aggregates/project//grupoetapa/grupoetapa');
const service = require('../../domain/aggregates/project/grupoetapa/services/grupo-etapa-service');
var config = require('../../config');

exports.getGrupoEtapa = async() => {
    var data = null;
    
    try 
    {
        data = await service.getGrupoEtapa();
    }
    catch (e) 
    {
    }

    return data;
}

exports.getById = async(id_grupo_etapa) => {
    var data = null;
    try 
    {
        data = await service.getById(id_grupo_etapa);
    } 
    catch (e) 
    {
    }
}


exports.insertGrupoEtapa = async(grupoetapa) => {
    try 
    {
        await service.insertGrupoEtapa(grupoetapa);
    } 
    catch (e) 
    {
    }
}

exports.updateGrupoEtapa = async(grupoetapa) => {
    try 
    {
        await service.updateGrupoEtapa(grupoetapa);
        
    } catch (e) 
    {
    }
};

exports.deleteGrupoEtapa = async(id_grupo_etapa) => {
    try 
    {
        await service.deleteGrupoEtapa(id_grupo_etapa);

    } catch (e) 
    {
    }
};