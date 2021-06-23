import { Status } from "@aggregates/Project/Status/Status";

export interface IStatusService
{
    InsertStatus:(status: Status)=> Promise<void>;
    UpdateStatus:(status: Status)=> Promise<void>;
    DeleteStatus:(statusId: number)=> Promise<void>;
    GetById:(statusId: number)=>  Promise<Status>;
    GetAll:()=> Promise<Array<Status>>;
}
