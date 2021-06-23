const Status = require('../../domain/aggregates/project/project/project');
const service = require('../../domain/aggregates/project/project/services/project-service');
var config = require('../../config');


exports.getProject = async() => {
    var data = null;
    
    try 
    {
        data = await service.getProject();
    }
    catch (e) 
    {
    }

    return data;
}

exports.getById = async(id_project) => {
    var data = null;
    try 
    {
        data = await service.getById(id_project);
    } 
    catch (e) 
    {
    }
}


exports.insertProject = async(project) => {
    try 
    {
        await service.insertProject(project);
    } 
    catch (e) 
    {
    }
}

exports.updateProject = async(project) => {
    try 
    {
        await service.updateProject(project);
        
    } catch (e) 
    {
    }
};

exports.deleteProject = async(id_project) => {
    try 
    {
        await service.deleteProject(id_project);

    } catch (e) 
    {
    }
};