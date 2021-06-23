const Project = require('../project');
const repository = require('../repository/project-repository');
exports.getProject = async() => {
    var data = null;
    
    try 
    {
        data = await repository.getProject();
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
        data = await repository.getById(id_project);
    } 
    catch (e) 
    {
    }
}


exports.insertProject = async(project) => {
    try 
    {
        await repository.insertProject(project);
    } 
    catch (e) 
    {
    }
}

exports.updateProject = async(project) => {
    try 
    {
        await repository.updateProject(project);
        
    } catch (e) 
    {
    }
};

exports.deleteProject = async(id_project) => {
    try 
    {
        await repository.deleteProject(id_project);

    } catch (e) 
    {
    }
};