import { Injectable, EventEmitter, Output } from '@angular/core';
import PaginationSettings from './pagination';

@Injectable() 
export class PaginationService {

    @Output() change= new EventEmitter<PaginationSettings>();

    setPageSettings(page: number, perPage: number, totalRecords : number) {
      let settings : PaginationSettings = {
          page: page,
          perPage: perPage,
          totalRecords: totalRecords
      }
      return settings;
    }
}