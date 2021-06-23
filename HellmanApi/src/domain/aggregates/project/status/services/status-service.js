const Status = require('../status');
const repository = require('../repository/status-repository');
exports.getStatus = async() => {
    var data = null;
    
    try 
    {
        data = await repository.getStatus();
    }
    catch (e) 
    {
    }

    return data;
}

exports.getById = async(id_status) => {
    var data = null;
    try 
    {
        data = await repository.getById(id_status);
    } 
    catch (e) 
    {
    }
}


exports.insertStatus = async(status) => {
    try 
    {
        await repository.insertStatus(status);
    } 
    catch (e) 
    {
    }
}

exports.updateStatus = async(status) => {
    try 
    {
        await repository.updateStatus(status);
        
    } catch (e) 
    {
    }
};

exports.deleteStatus = async(id_status) => {
    try 
    {
        await repository.deleteStatus(id_status);

    } catch (e) 
    {
    }
};