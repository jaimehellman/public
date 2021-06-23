import "reflect-metadata";
import { Container } from "inversify";
import { StatusAppService } from "@apps/StatusAppService";
import { IStatusAppService } from "@iapps/IStatusAppService";
import { IStatusRepository } from "@aggregates/Project/Status/Repository/IStatusRepository";
import {StatusRepository} from "@repository/StatusRepository";
import { IStatusService } from "@aggregates/Project/Status/Services/IStatusService";
import { StatusService } from "@aggregates/Project/Status/Services/StatusService";


export class BootStrapper
{
    public static RegisterServices(container: Container): void
    {
        /* --------------- Application -----------------------*/
        container.bind<IStatusAppService>('StatusAppService').to(StatusAppService);

       /* --------------- Domain -----------------------*/
       container.bind<IStatusService>('StatusService').to(StatusService);
    

       /* --------------- Data -----------------------*/
       container.bind<IStatusRepository>('StatusRepository').to(StatusRepository);
    }

}
