import { Observable } from 'rxjs';


export interface IService<T, ID> {
   insert(action: string, t: T) : Observable<T>;
   update(action: string, t: T) : Observable<T>;
   findById(action: string,  id: ID) : Observable<T>;
   findAll(action: string, t : T) : Observable<T[]>;
   getAll(action: string, ) : Observable<T[]>;
   delete(action: string, id: ID) : Observable<any>;
}