import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  take } from 'rxjs/operators';

@Injectable()
export default class MockService  {

    constructor(
        protected http: HttpClient,
    ) {

    }

    getGrupos(){
        return this.http.get('assets/data/grupo-etapa.json').pipe(take(1));;
    }

}