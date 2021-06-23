const Programa = require('../programa');
const repository = require('../repository/programa-repository');

exports.getPrograma = async() => {
    var data = null;
    
    try 
    {
        data = await repository.getPrograma();
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
        data = await repository.getById(id_programa);
    } 
    catch (e) 
    {
    }
}


exports.insertPrograma = async(programa) => {
    try 
    {
        await repository.insertPrograma(programa);
    } 
    catch (e) 
    {
    }
}

exports.updatePrograma = async(programa) => {
    try 
    {
        await repository.updatePrograma(programa);
        
    } catch (e) 
    {
    }
};

exports.deletePrograma = async(id_programa) => {
    try 
    {
        await repository.deletePrograma(id_programa);

    } catch (e) 
    {
    }
};