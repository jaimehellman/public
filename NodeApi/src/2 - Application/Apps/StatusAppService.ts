import { injectable, inject } from "inversify";
import { StatusModel } from "@models/StatusModel";
import {Status} from '@aggregates/Project/Status/Status';
import { IStatusAppService } from "@iapps/IStatusAppService";
import { IStatusService } from "@aggregates/Project/Status/Services/IStatusService";
import { ApplicationService } from "@apps/Core/ApplicationService";

@injectable()
export class StatusAppService extends ApplicationService implements IStatusAppService
{

    public constructor(
        @inject("StatusService")  private _statusService:  IStatusService
    ) {
        super();
    }

    public async InsertStatus (status: StatusModel): Promise<void>
    {
        await this._statusService.InsertStatus(status as Status);
    }

    public async UpdateStatus (status: StatusModel): Promise<void>
    {
        await this._statusService.UpdateStatus(status as Status);
    }

    public async DeleteStatus (statusId: number): Promise<void>
    {
       await this._statusService.DeleteStatus(statusId);
    }

    public async GetById (statusId: number): Promise<StatusModel> 
    {
        return await this._statusService.GetById(statusId);
        
    }

    public async GetAll (): Promise<Array<StatusModel>>  
    {
        return await this._statusService.GetAll();
    }
}
