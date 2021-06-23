import { SwaggerDefinitionConstant } from "swagger-express-typescript";

export class CoreSwagger
{
     protected ArrayType: string;
     protected BooleanType: string;
     protected IntegerType: string;
     protected NumberType: string;
     protected ObjectType: string;
     protected StringType: string;

     constructor()
     {
        this.ArrayType   = SwaggerDefinitionConstant.Model.Property.Type.ARRAY;
        this.BooleanType = SwaggerDefinitionConstant.Model.Property.Type.BOOLEAN;
        this.IntegerType = SwaggerDefinitionConstant.Model.Property.Type.INTEGER;
        this.NumberType  = SwaggerDefinitionConstant.Model.Property.Type.NUMBER;
        this.ObjectType  = SwaggerDefinitionConstant.Model.Property.Type.OBJECT;
        this.StringType  = SwaggerDefinitionConstant.Model.Property.Type.STRING;
     }
}