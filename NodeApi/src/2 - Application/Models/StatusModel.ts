import 'reflect-metadata';
import { ApiModel, ApiModelProperty } from "swagger-express-typescript"

@ApiModel( {
    description : "StatusModel" ,
    name : "StatusModel"
} )
export class StatusModel
{
    @ApiModelProperty( {
        description : "Id" ,
        required : true,
        example: ['1']
    })
    public statusId: number

    @ApiModelProperty( {
        description : "Name" ,
        required : true
    } )
    public name: string
}