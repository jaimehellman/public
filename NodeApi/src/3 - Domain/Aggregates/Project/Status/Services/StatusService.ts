import { injectable, inject } from "inversify";
import {Status} from '@aggregates/Project/Status/Status';
import { IStatusService } from "@aggregates/Project/Status/Services/IStatusService";
import { IStatusRepository } from "@aggregates/Project/Status/Repository/IStatusRepository";

@injectable()
export class StatusService implements IStatusService
{
 
    public constructor(
        @inject("StatusRepository") private _statusRepository: IStatusRepository
    ) {
    }

    public async InsertStatus (status: Status): Promise<void>
    {
        await this._statusRepository.Insert(status as Status);
    }

    public async UpdateStatus (status: Status): Promise<void>
    {
        await this._statusRepository.Update(status as Status);
    }

    public async DeleteStatus (statusId: number): Promise<void>
    {
        await this._statusRepository.Delete(statusId);
    }

    public async GetById (statusId: number): Promise<Status>
    {
        return  await this._statusRepository.GetById(statusId);
    }

    public async GetAll (): Promise<Array<Status>>
    {
        return await this._statusRepository.GetAll();
    }
}

