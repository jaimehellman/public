import { Component, OnInit, Input, OnChanges, ComponentFactoryResolver } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';

import GrdiviewCoreComponent from '../gridview-core-component';

import TableSettings, { TableHeader, GridviewType, ActionPosition } from '../table-settings';
import PaginationSettings from '../../pagination/pagination';

import AlertService from '../../alert/alert.service';
import ConfirmService from '../../confirm/confirm.service';
import { PaginationService } from '../../pagination/pagination.service';

@Component({
  selector: 'app-gridview-in-memory',
  templateUrl: './gridview-in-memory.component.html',
  styleUrls: ['./gridview-in-memory.component.css']
})
export class GridviewInMemoryComponent extends GrdiviewCoreComponent implements OnInit {

  
  @Input() settings: TableSettings;

  pageSettings : PaginationSettings;
  newData : any;
  page: number = 1;
  deleteModalRef: BsModalRef;
  counter: number = 0;

  subscription: Subscription;
  
  constructor( 
    private alertService : AlertService,
    private confirmService: ConfirmService,
    public paginationService: PaginationService
    ) { 
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
       this.onRefrech();
     },100);
  }

  onRefrech(){
    this.newData = { ...this.settings.data[0]}; 
    this.loadNew();
    this.setPaginationInfo();
  }

  loadNew(){
     this.counter = this.settings.data.length+1; 
     this.settings.headers.forEach(header => {
        let value :any = "";
        if(header.key)
          value = this.counter;
          this.newData[header.columnName] = value;
      });
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

  saveInline(formInline: any, dt: any) {
    let message : string  = "Registro atualizado com sucesso!";
    if(!dt){
      this.cancelInsertInline();
      message = "Registro inserido com sucesso!";
      this.settings.data.push(formInline.value);
      this.onRefrech();
    }
    else{
      this.cancelEditInline(dt);
      this.editRow(formInline.value);
    }
    this.alertService.showSuccess(message);
  }

  findIndex(dt: any)
  {
    let headerKey = this.settings.headers.find(x=>x.key);
    let filter : any = dt[headerKey.columnName];
    let index: number = this.settings.data.findIndex(x=>x[headerKey.columnName] === filter);
    return index;
  }

  findElement(dt: any)
  {
    let headerKey = this.settings.headers.find(x=>x.key);
    let filter : any = dt[headerKey.columnName];
    let index: number = this.settings.data.findIndex(x=>x[headerKey.columnName] === filter);
    return this.settings.data.find(x=>x[headerKey.columnName] === filter);
  }
 
  editRow(dt: any){
     let index = this.findIndex(dt);
     this.settings.data.splice(index,1,dt);
  }

  deleteInline(formInline: any) {
    const confirmObservable = this.confirmService.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse curso?');
    confirmObservable.asObservable().pipe(take(1)).subscribe(result => this.onDelete(result,formInline) );    
  }



  onDelete(result :boolean, data: any)
  {
      if(result)
      {
          this.deleteRow(data);
          this.alertService.showSuccess("Registro deletado com sucesso!");
      }
  }

  deleteRow(dt: any){
    let index = this.findIndex(dt);
    this.settings.data.splice(index,1);
  }

}
