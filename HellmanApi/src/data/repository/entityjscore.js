const Predicate = require('./predicate');
class EntityJSCore
{
	constructor()
	{
	   this.entityClass = null;
	   this.joins = [];
	   this.predicate = new Predicate();
	}

	Join(target, id_source, id_target)
	{
		const join = {
			source: this.entityClass,
			target: target,
			id_source: id_source,
			id_target: id_target,
			joinType: "INNER JOIN"
		}
		this.joins.push(join);
		return this;
	}
	
	LJoin(target, id_source, id_target)
	{
		const join = {
			source: this.entityClass,
			target: target,
			id_source: id_source,
			id_target: id_target,
			joinType: "LEFT JOIN"
		}
		this.joins.push(join);
		return this;
	}
			
	InnerJoin(source, target, id_source, id_target)
	{
		const join = {
			source: source,
			target: target,
			id_source: id_source,
			id_target: id_target,
			joinType: "INNER JOIN"
		}
				
		this.joins.push(join);
		return this;
	}
	
	LeftJoin(source, target, id_source, id_target)
	{
		const join = {
			source: source,
			target: target,
			id_source: id_source,
			id_target: id_target,
			joinType: "LEFT JOIN"
		}
				
		this.joins.push(join);
		return this;
	}
	
	GetFields(entityClass, sep, withAlias, type)
	{
		var fieldConcat = "";
		var alias = "";
		var separator = sep;
		var instance = new entityClass();
		var fields = Reflect.ownKeys(instance);
		var tableId = this.GetTableId(instance);
		if(withAlias == true)
		{
			alias = this.GetAlias(entityClass, "field");
		}
		fields.forEach(function(name)
		{
			if(name.toLowerCase().startsWith('table'))
			{
				return;
			}	
			
            if(type == "insert" && name.toLowerCase() == tableId)	
			{
				return;
			}		
			fieldConcat += separator +""+alias+ name;
			separator = ", ";
		});
				
		return fieldConcat;
	}
	
	GetValues(object, type)
	{
		var values = "";
    	var fields = Reflect.ownKeys(object);
		var separator = "";
		var outer = this;
		var tableId = this.GetTableId(object);
		fields.forEach(function(name){
			if(name.toLowerCase().startsWith('table'))
			{
				return;
			}	

            if(type == "insert" && name.toLowerCase() == tableId)	
			{
				return;
			}	
 			values += separator + outer.IsString(Reflect.get(object, name));
			separator = ", ";
		});
				
		return values;
	}
	
	GetFieldWithValue(object, type)
	{
		var values = "";
    	var fields = Reflect.ownKeys(object);
		var separator = "";
		var outer = this;
		var tableId = this.GetTableId(object);
		fields.forEach(function(name){
			if(name.toLowerCase().startsWith('table'))
			{
				return;
			}	

            if(type == "update" && name.toLowerCase() == tableId)	
			{
				return;
			}	
 			values += separator + name + " = " + outer.IsString(Reflect.get(object, name));
			separator = ", ";
		});
				
		return values;
	}
	
	GetTableId(object)
	{
		return Reflect.get(object, "tableId");
	}
	
	GetTableIdValue(object)
	{
		return Reflect.get(object, this.GetTableId(object));
	}
	
	IsString(value)
	{
		if(value){
			if (typeof value === 'string' || value instanceof String)
				value = "'"+value+"'";
		}
		return value;
	}
	
	GetTableName(entityClass)
	{
		var instance = new entityClass();
		var tableName = entityClass.name;
		var fields = Reflect.ownKeys(instance);
			   
		if(fields.includes("tableName"))
		{
			tableName = Reflect.get(instance,"tableName");
		}  
			   
		return tableName;
	}
	
	GetAlias(entityClass, type)
	{
		var alias = "";
		var instance = new entityClass();
		var fields = Reflect.ownKeys(instance);
		var instance = new entityClass();
		if(this.joins.length == 0)
		{
			return "";
		}
			   
		if(fields.includes("tableAlias"))
		{
			alias = Reflect.get(instance,"tableAlias");
		}
		else
		{
		    alias = this.GetAliasByEntity(entityClass);
		}

		if(type == "field") alias = alias+".";
		if(type == "join") alias = " AS "+alias;
		return alias.toLowerCase();
	}
	
	GetAliasByEntity(entityClass)
	{
		var alias = entityClass.name;
		if(alias.length > 4)
		{
			alias = alias.substring(0, 4);
		}
			   
		return alias;
	}
	
	BuildSelectJoin()
	{
		var fielConcat = "";
		var outer = this;			
			
		this.joins.forEach(function(join){
			var target = join.target;
			fielConcat += outer.GetFields(target,", ",true,"select");
		});
				
		return fielConcat;
	}
	
	AddJoins()
	{
		var outerThis = this;
		var joinQuery = "";
		this.joins.forEach(function(join){
			var source = join.source;
			var target = join.target;
			var sourceAlias = outerThis.GetAlias(source,"field");
			var targetAlias = outerThis.GetAlias(target,"join");
			var targetAliasField = outerThis.GetAlias(target,"field");
			var joinType = join.joinType;
			joinQuery += " "+joinType + " "+ target.name.toLowerCase() + targetAlias;
			joinQuery += " ON "+sourceAlias+ join.id_source + " = ";
			joinQuery += targetAliasField+ join.id_target;
		});
			   
		return joinQuery;
	}
	
	BuildeWhereId(object)
	{
		return " WHERE "+ this.GetTableId(object) + " = " + this.GetTableIdValue(object);
	}
	
	BuildSelect()
	{
		var className = this.GetTableName(this.entityClass);
		var fields = this.GetFields(this.entityClass,"", true, "select");
		fields += this.BuildSelectJoin();
		var query = "SELECT "+fields+" FROM " + 
		className.toLowerCase()+" "+this.AddJoins()+
		this.BuildWhere();
		return query;
	}
	
	BuildSelectById(object)
	{
		var className = this.GetTableName(this.entityClass);
		var fields = this.GetFields(this.entityClass,"", true, "select");
		fields += this.BuildSelectJoin();
		var query = "SELECT "+fields+" FROM " + 
		className.toLowerCase()+" "+this.AddJoins();
		query += this.BuildeWhereId(object);
		return query;
	}
	
	BuildInsert(object)
	{
		var entityName = this.entityClass.name;
		var query = "INSERT INTO "+entityName+" (" +this.GetFields(this.entityClass,"", false, "insert")+")";
		query += " VALUES ("+this.GetValues(object,"insert")+");";
		return query;
	}
	
	BuildUpdate(object)
	{
		var entityName = this.entityClass.name.toLowerCase();
		var query = "UPDATE "+entityName+" SET "+ this.GetFieldWithValue(object,"update");
		query += this.BuildeWhereId(object);
		return query;
	}
	
	BuildDelete(object)
	{
		var entityName = this.entityClass.name;
		var query = "DELETE from " + entityName.toLowerCase();
		query += this.BuildeWhereId(object);
		return query;
	}
	
	BuildWhere()
	{
		var where = " where 1=1 ";
		var sep = " and ";
		var outerThis = this;
		this.predicate.operations.forEach(function(option){
		     where+= sep + option.className+"."+outerThis.predicate.checkOperation(option);
		});
		
		return where;
	}
}

module.exports = EntityJSCore; 