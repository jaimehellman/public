class Predicate
{
	constructor()
	{
	   this.operations = [];
	}
	
	add(className, key, value, operation)
	{
		const ope = {
			className: className,
			key: key,
			value: value,
			operation: operation,
		}
		this.operations.push(ope);
		return this;
		
	}
	
	eq(className, key, value)
	{
		this.add(className, key, value, "eq");
		return this;
	}
	
	ne(className, key, value)
	{
	   this.add(className, key, value, "ne");
	   return this;
	}
	
	gt(className, key, value)
	{
	   this.add(className, key, value, "gt");
	   return this;
	}
	
	ge(className, key, value)
	{
	   this.add(className, key, value, "ge");
	   return this;
	}
	
	lt(className, key, value)
	{
	   this.add(className, key, value, "lt");
	   return this;
	}
	
	le(className, key, value)
	{
	   this.add(className, key, value, "le");
	   return this;
	}
	
	like(className, key, value)
	{
	   this.add(className, key, value, "like");
	   return this;
	}
	
	start(className, key, value)
	{
	   this.add(className, key, value, "start");
	   return this;
	}
	
	end(className, key, value)
	{
	   this.add(className, key, value, "end");
	   return this;
	}
	
	In(className, key, value)
	{
	   this.add(className, key, value, "in");
	   return this;
	}
	
	notIn(className, key, value)
	{
	   this.add(className, key, value, "notin");
	   return this;
	}
	
	checkOperation(option)
	{
		var operation = "";
		switch(option.operation)
		{
			case "eq":
			   operation = "@key = @value ";
			break;
			case "ne":
			   operation = "@key <> @value ";
			break;
			case "gt":
			   operation = "@key > @value ";
			break;
			case "ge":
			   operation = "@key >= @value";
			break;
			case "lt":
			   operation = "@key < @value";
			break;
			case "le":
			   operation = "@key <= @value";
			break;
			case "like":
			   operation = "@key like %@value% ";
			break;
			case "start":
			   operation = "@key like @value% ";
			break;
			case "end":
			   operation = "@key like %@value ";
			break;
			case "in":
			    operation = "@key in @value";
			break;
			case "notin":
			   operation = "@key not in @value";
			break;
		}
		operation = operation.replaceAll('@key', option.key);
		operation = operation.replaceAll('@value', option.value);
		return operation;
	}
}

module.exports = Predicate; 