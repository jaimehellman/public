import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IService } from './IService';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export abstract class BaseService<T, ID> implements IService<T, ID> {
    
    private _url : string;
    private headers: HttpHeaders =  new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Access-Control-Allow-Origin':'*'
    });;
    constructor(
        protected _http: HttpClient,
      ) {
        this._url = environment.urlApi;
      }

      insert(action: string, t: T): Observable<T> {
        return this._http.post<T>(this._url+action, JSON.stringify(t),{  headers: this.headers});
      }

      update(action: string,  t: T): Observable<T> {
        return this._http.post<T>(this._url+action, JSON.stringify(t),{  headers: this.headers});
      }

      findById(action: string, id: ID): Observable<any> {
        return this._http.get<any>(this._url+action + "?id=" + id,{  headers: this.headers});
      }

      findBy(action: string, id: ID): Observable<T[]> {
        return this._http.get<T[]>(this._url+action + "?id=" + id,{  headers: this.headers});
      }

      findAll(action: string,  t : any): Observable<T[]> {
        return this._http.post<T[]>(this._url+action, JSON.stringify(t),{headers: this.headers});
      }

      getAll(action: string): Observable<T[]> {
        return this._http.get<T[]>(this._url+action,{  headers: this.headers});
      }

      delete(action: string, t: any): Observable<T> {
        return this._http.post<T>(this._url+action,t,{  headers: this.headers});
      }
}