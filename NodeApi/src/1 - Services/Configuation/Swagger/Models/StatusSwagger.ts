import { CoreSwagger } from "./CoreSwagger";

export class StatusSwagger extends CoreSwagger
{
    constructor(){
        super();
    }

    public static ToModel(): any
    {
        return new StatusSwagger().Model();
    }

    public Model(): any
    {
        return {
            properties : {
                statusId : {
                    type :  this.NumberType,
                    required : true
                } ,
                name : {
                    type : this.StringType ,
                    required : true
                } ,
            }
        }
    }
}