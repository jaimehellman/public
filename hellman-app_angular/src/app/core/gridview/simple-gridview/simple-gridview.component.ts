import { Component, OnInit, Input, OnChanges } from '@angular/core';
import TableSettings, { TableHeader, GridviewType, ActionPosition } from '../table-settings';
import PaginationSettings from '../../pagination/pagination';

import GrdiviewCoreComponent from '../gridview-core-component';

import { PaginationService } from '../../pagination/pagination.service';

@Component({
  selector: 'app-simple-gridview',
  templateUrl: './simple-gridview.component.html',
  styleUrls: ['./simple-gridview.component.css']
})
export class SimpleGridviewComponent extends GrdiviewCoreComponent  implements OnInit,OnChanges {

  @Input() settings: TableSettings;

  pageSettings : PaginationSettings;

  constructor( public paginationService: PaginationService) {
    super();
  }

  ngOnInit() {
    this.configuration();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
     this.configuration();
  }

  configuration(){
    setTimeout(() => {
         this.setPaginationInfo();
     },100);
  }

  setPaginationInfo(){
    if(this.settings.pagination){
        let perPage = this.settings.perPage !== null? this.settings.perPage:0;
        if(this.settings.data){
          if(this.settings.data.length > 0){
            this.totalRecords = this.settings.data.length;
            this.pageSettings = this.paginationService.setPageSettings(1,perPage,this.totalRecords);
          }
        }
     }
  }
  saveInline(formInline: any, action: string) {
  
  }

  deleteInline(formInline: any) {

  }


}
