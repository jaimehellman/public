const Entity = require('../../core/entity');
class Status extends Entity
{
	constructor()
	{
		super();
		super.tableId = "id_status";
		this.id_status = 0;
		this.name = '';
	}
}

    
module.exports = Status; 