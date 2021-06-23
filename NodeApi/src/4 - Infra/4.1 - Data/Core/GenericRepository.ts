import { injectable} from "inversify";
import {IRepository} from '@irepository/IRepository';
import { Connection ,Repository} from "typeorm";
import { DatabaseContext } from "@context/DatabaseContext";


@injectable()
export class GenericRepository<TEntity> extends Repository<TEntity> implements IRepository<TEntity>
{

    protected entityClass: any;
    protected connection: Connection;
    public constructor(entityClass : any)
    {
         super();
         this.entityClass = entityClass;
         this.connection  = DatabaseContext.GetInstance();
    }

    public async Insert (entity: TEntity): Promise<void>
    {
        let repository = this.connection.getRepository(this.entityClass);
        repository.save(entity);
    }

    public async InsertRange (entities: Array<TEntity>):  Promise<void>
    {
        let repository = this.connection.getRepository(this.entityClass);
        repository.save(entities);
    }

    public async Update (entity: TEntity):  Promise<void>
    {
        let repository = this.connection.getRepository(this.entityClass);
        repository.save(entity);
    }

    public async UpdateRange (entities: Array<TEntity>):  Promise<void>
    {
        let repository = this.connection.getRepository(this.entityClass);
        repository.save(entities);
    }

    public async Delete (id: number): Promise<void>
    {
        this.connection.manager.delete(this.entityClass, id);
    }

    public async DeleteObject (entity: TEntity): Promise<void>
    {
        let repository = this.connection.getRepository(this.entityClass);
        repository.remove(entity);
    }

    public async DeleteRange (entities: Array<TEntity>):  Promise<void>
    {
        let repository = this.connection.getRepository(this.entityClass);
        repository.remove(entities);
    }

    public async GetByFilter (filter: any): Promise<any>
    {
        return await this.connection.manager.findOne(this.entityClass, filter);
    }

    public async GetAll ():  Promise<Array<TEntity>>
    {
        return await this.connection.manager.find(this.entityClass)
    }

}

