
import {  injectable } from "inversify";
import { Status } from '@aggregates/Project/Status/Status';
import {IStatusRepository} from '@aggregates/Project/Status/Repository/IStatusRepository';
import {GenericRepository} from '@core/GenericRepository';

@injectable()
export class StatusRepository extends GenericRepository<Status> implements IStatusRepository
{
    constructor()
    {
        super(Status);
    }

    public async GetById (id: any): Promise<any>
    {
        return await super.GetByFilter({"statusId": id});
    }
}

