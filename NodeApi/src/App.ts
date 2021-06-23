  
import "reflect-metadata";
import * as express from "express";
import { Container } from 'inversify';
import {SwaggerConfiguration} from './1 - Services/Configuation/Swagger/SwaggerConfiguration';
import { InversifyExpressServer } from 'inversify-express-utils';
import { buildProviderModule } from "inversify-binding-decorators";
import * as bodyParser from 'body-parser';
import {BootStrapper} from '@ioc/BootStrapper';
import "@controllers/StatusController";


export class App 
{
    public server: InversifyExpressServer;
    public container: Container;

    public constructor () 
    {
        this.container = new Container({skipBaseClassChecks: true});
    }

    public Run()
    {
        this.RegisterDependencies();
        this.CreateServer();
    }

    private middlewares (): void 
    {
        this.server.setConfig((app) => {
            app.use(bodyParser.urlencoded({ extended: true  }));
            app.use(bodyParser.json());
            SwaggerConfiguration.AddSwaggerConfig(app);
        });
    }


    private CreateServer(): void
    {
        this.container.load(buildProviderModule());
        this.server = new InversifyExpressServer(this.container);
        this.middlewares();
        let app = this .server.build();
        this.SetError();
        app.listen(3333);
    }

    private  SetError(): void
    {
        this.server.setErrorConfig( ( app : any ) => {
            app.use( ( err : Error , request : express.Request , response : express.Response , next : express.NextFunction ) => {
                console.error( err.stack );
                response.status( 500 ).send( "Something broke!" );
            });
        });
    }

    private RegisterDependencies(): void 
    {
        return BootStrapper.RegisterServices(this.container);
    }

}
