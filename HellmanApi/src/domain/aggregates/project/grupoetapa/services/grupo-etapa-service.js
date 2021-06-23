const GrupoEtapa = require('../grupoetapa');
const repository = require('../repository/grupo-etapa-repository');

exports.getGrupoEtapa = async() => {
    var data = null;
    
    try 
    {
        data = await repository.getGrupoEtapa();
    }
    catch (e) 
    {
    }

    return data;
}

exports.getById = async(id_grupoetapa) => {
    var data = null;
    try 
    {
        data = await repository.getById(id_grupoetapa);
    } 
    catch (e) 
    {
    }
}


exports.insertGrupoEtapa = async(grupoetapa) => {
    try 
    {
        await repository.insertGrupoEtapa(grupoetapa);
    } 
    catch (e) 
    {
    }
}

exports.updateGrupoEtapa = async(grupoetapa) => {
    try 
    {
        await repository.updateGrupoEtapa(grupoetapa);
        
    } catch (e) 
    {
    }
};

exports.deleteGrupoEtapa = async(id_grupoetapa) => {
    try 
    {
        await repository.deleteGrupoEtapa(id_grupoetapa);

    } catch (e) 
    {
    }
};