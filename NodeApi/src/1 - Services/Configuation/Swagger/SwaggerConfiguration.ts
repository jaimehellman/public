import * as express from "express";
import * as swagger from "swagger-express-typescript";
import {StatusSwagger} from '@swagger/StatusSwagger';

export class SwaggerConfiguration
{
    public static AddSwaggerConfig(app: any): void
    {
        app.use( '/api-docs/swagger' , express.static( 'swagger' ) );
        app.use('/api-docs/swagger/assets',express.static('node_modules/swagger-ui-dist'));
        
        app.use( swagger.express(
            {
                definition : {
                    info : {
                        title : "Hellman API" ,
                        version : "1.0"
                    },
                    models:{
                        StatusModel: StatusSwagger.ToModel()
                    },
                    externalDocs : {
                        url : "http://hellman.com"
                    }
                }
            }
        ) );
    }
}