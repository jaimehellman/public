export interface IRepository<TEntity>
{
    Insert:(entity: TEntity)=> Promise<void>;
    InsertRange:(entity: Array<TEntity>)=> Promise<void>;
    Update:(entity: TEntity)=> Promise<void>;
    UpdateRange:(entity: Array<TEntity>)=> Promise<void>;
    DeleteObject:(entity: TEntity)=> Promise<void>;
    Delete:(id: number)=> Promise<void>;
    DeleteRange:(entity: Array<TEntity>)=> Promise<void>;
    GetByFilter:(filter: any)=> Promise<any>;
    GetAll:()=> Promise<TEntity[]>;
}