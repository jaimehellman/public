const Entity = require('../../core/entity');
class GrupoEtapa extends Entity
{
	constructor()
	{
		super();
		super.tableId = "id_grupoetapa";
		this.id_grupoetapa = 0;
		this.name = '';
	}
}
    
module.exports = GrupoEtapa; 