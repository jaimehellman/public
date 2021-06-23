import { Component, OnInit, Input, OnChanges, ComponentFactoryResolver, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';

import GrdiviewCoreComponent from '../gridview-core-component';

import TableSettings, { TableHeader, GridviewType, ActionPosition, Action, ActionType } from '../table-settings';
import PaginationSettings from '../../pagination/pagination';

import  ToastService from '../../toast/toasr.service';
import ConfirmService from '../../confirm/confirm.service';
import { PaginationService } from '../../pagination/pagination.service';
import {GenericService} from '../../../services/generic-service';

import  {BaseService} from '../../../services/core/BaseService';

@Component({
  selector: 'app-gridview-inline',
  templateUrl: './gridview-inline.component.html',
  styleUrls: ['./gridview-inline.component.css']
})
export class GridviewInlineComponent extends GrdiviewCoreComponent implements OnInit,OnChanges {

  @Input() settings: TableSettings;

  rowActions: Array<Action> = new Array<Action> ();
  headerActions: Array<Action> = new Array<Action> ();

  pageSettings : PaginationSettings;
  newData : any ={};
  page: number = 1;
  deleteModalRef: BsModalRef;
  subscription: Subscription;
  @Output() reload = new EventEmitter<any>();

  
  constructor( 
    private  toastService : ToastService,
    private genericService : GenericService,
    private modalService: BsModalService,
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
         this.loadNew();
         this.loadActions();
         this.setPaginationInfo();
     },500);
  }

  loadNew(){
      this.settings.headers.forEach(header => {
          let value: any = "";
          if(header.key){
              value = this.settings.keyValue>0?this.settings.keyValue:0;

          }
          this.newData[header.columnName] = value;
      });
     
  }

  loadActions()
  {
      if(this.settings.actions){
          this.rowActions = this.settings.actions.filter(x=> x.type === ActionType.Row);
          this.headerActions = this.settings.actions.filter(x=> x.type === ActionType.Header);
      }
     this.getKey();
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
    if(this.validateForm(formInline.value)){
          if(!dt){
              this.genericService.insert(this.GerarAction("Inserir"),formInline.value).subscribe(res => this.onInsertMessage(res));
          }
          else{
              this.genericService.update(this.GerarAction("Atualizar"),formInline.value).subscribe(res => this.onUpdateMessage(res,dt));
          }
     }
    
  }

  validateForm(form: any){
     let valid: boolean = true;
     let msgs: string = "";
     this.settings.headers.forEach(header => {
         if(form[header.columnName] =="" && !header.key ){
             msgs +='<li>O Campo ' + header.columnTitle+" deve ser informado</li>" ;
         }
     });
     if(msgs !== ""){
        valid = false;
        this.showMessages(msgs);
     }
    return valid;
  }

  showMessages(msgs:  string){
      this.toastService.showToastWarning("Atenção",msgs,"");
  }

  GerarAction(prefix: string){
     return prefix + this.settings.controller.substring(0,1).toUpperCase()
     +this.settings.controller.substring(1).toLowerCase();
  }

  onInsertMessage(res :any)
  {
    let emitValue = this.settings.keyValue?this.settings.keyValue:true;
    this.reload.emit(emitValue);
    this.toastService.showToastSuccess("Atenção","Registro inserido com sucesso!","");
    this.cancelInsertInline();
    this.configuration();
  }

  onUpdateMessage(res :any, dt: any)
  {
    let emitValue = this.settings.keyValue?this.settings.keyValue:true;
    this.reload.emit(emitValue);
    this.toastService.showToastSuccess("Atenção","Registro alterado com sucesso!","");
    this.cancelEditInline(dt);
    this.configuration();
  }

  deleteInline(formInline: any)
  {
     this.genericService.delete(this.GerarAction("Deletar"),formInline).subscribe(res => this.onDeleteMessage(res));
  }

  onDeleteMessage(res :any)
  {
    let emitValue = this.settings.keyValue?this.settings.keyValue:true;
    this.reload.emit(emitValue);
    this.toastService.showToastSuccess("Atenção","Registro deletado com sucesso!","");
    this.configuration();
  }
  changeCombo(event: any){
      console.log(event);
  }


}
