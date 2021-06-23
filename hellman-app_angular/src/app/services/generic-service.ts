import { Injectable } from '@angular/core';
import { BaseService } from './core/BaseService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export  class GenericService extends BaseService<any, number> {

    constructor(protected _http: HttpClient) {
        super(_http);
    }
}