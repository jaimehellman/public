import {Status} from '@aggregates/Project/Status/Status'; 
import { IRepository } from "@irepository/IRepository";

export interface IStatusRepository extends IRepository<Status>
{
    GetById:(statusId: number)=>  Promise<Status>;
}