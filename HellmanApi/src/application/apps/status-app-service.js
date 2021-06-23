const Status = require('../../domain/aggregates/project/status/status');
const service = require('../../domain/aggregates/project/status/services/status-service');

exports.getStatus = async() => {
    var data = null;
    
    try 
    {
        data = await service.getStatus();
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
        data = await service.getById(id_status);
    } 
    catch (e) 
    {
    }
}


exports.insertStatus = async(status) => {
    try 
    {
        await service.insertStatus(status);
    } 
    catch (e) 
    {
    }
}

exports.updateStatus = async(status) => {
    try 
    {
        await service.updateStatus(status);
        
    } catch (e) 
    {
    }
};

exports.deleteStatus = async(id_status) => {
    try 
    {
        await service.deleteStatus(id_status);

    } catch (e) 
    {
    }
};