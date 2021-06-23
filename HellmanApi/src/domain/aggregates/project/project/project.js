const Entity = require('../../core/entity');
class Project extends Entity
{
	constructor()
	{
		super();
		super.tableId = "id_project";
		this.id_project = 0;
		this.name = '0';
		this.id_programa = 0;
		this.id_status = 0;
	}
}

module.exports = Project; 