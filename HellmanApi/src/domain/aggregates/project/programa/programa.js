const Entity = require('../../core/entity');
class Programa extends Entity
{
	constructor()
	{
		super();
		super.tableId = "id_programa";
		this.id_programa = 0;
		this.name = '';
		this.id_grupoetapa = 0;
	}
}

module.exports = Programa; 