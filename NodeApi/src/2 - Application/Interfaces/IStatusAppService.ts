import { StatusModel } from "../Models/StatusModel";

export interface IStatusAppService
{
    InsertStatus:(status: StatusModel)=> Promise<void>;
    UpdateStatus:(status: StatusModel)=> Promise<void>;
    DeleteStatus:(statusId: number)=> Promise<void>;
    GetById:(statusId: number)=> Promise<StatusModel>;
    GetAll:()=> Promise<Array<StatusModel>>;
}
