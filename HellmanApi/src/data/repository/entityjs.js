const EntityJSCore = require('./entityjscore');
const Connection = require('../connection/connection');
class EntityJS extends EntityJSCore
{
	From(classObject)
	{
		super.entityClass = classObject;
		return this;
	}
	
	async Insert(object)
	{
		var query = this.BuildInsert(object);
		var result  = await Connection.executeUpdate(query);
		//Connection.close();
		return result;
	}
	
	async Update(object)
	{
		
		var query = this.BuildUpdate(object);
		var result  = await Connection.executeUpdate(query);
		//Connection.close();
		return result;
	}
	
	async Delete(object)
	{
		
		var query = this.BuildDelete(object);
		var result  = await Connection.executeUpdate(query);
		//Connection.close();
		return result;
	}

	async GetAll()
	{
		
		var query = this.BuildSelect();
		var data  = await Connection.execute(query);
		//Connection.close();
		return data;
	}
	
	async GetById(object)
	{
		
		var query = this.BuildSelectById(object);
		var data  = await Connection.execute(query);
		//Connection.close();
		return data;
	}
	
	Where(predicate)
	{
		return this;
	}
}

module.exports = EntityJS; 