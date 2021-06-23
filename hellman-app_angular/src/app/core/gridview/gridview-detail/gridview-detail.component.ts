import { Component, OnInit, Input, OnChanges, ComponentFactoryResolver } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';

import GrdiviewCoreComponent from '../gridview-core-component';

import TableSettings, { TableHeader, GridviewType, ActionPosition, Action, ActionType } from '../table-settings';
import PaginationSettings from '../../pagination/pagination';

import AlertService from '../../alert/alert.service';
import ConfirmService from '../../confirm/confirm.service';
import { PaginationService } from '../../pagination/pagination.service';



@Component({
  selector: 'app-gridview-detail',
  templateUrl: './gridview-detail.component.html',
  styleUrls: ['./gridview-detail.component.css']
})
export class GridviewDetailComponent  extends GrdiviewCoreComponent implements OnInit, OnChanges {

  @Input() settings: TableSettings;

  rowActions: Array<Action> = new Array<Action> ();
  headerActions: Array<Action> = new Array<Action> ();
  pageSettings : PaginationSettings;
  page: number = 1;
  deleteModalRef: BsModalRef;

  subscription: Subscription;
  
  constructor( 
    private alertService : AlertService,
    private confirmService: ConfirmService,
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
         this.loadActions();
         this.setPaginationInfo();
     },100);
  }

  loadActions()
  {
      if(this.settings.actions){
          this.rowActions = this.settings.actions.filter(x=> x.type === ActionType.Row);
          this.headerActions = this.settings.actions.filter(x=> x.type === ActionType.Header);
      }
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
   
  }

  deleteInline(formInline: any) {
    const confirmObservable = this.confirmService.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse curso?');
    confirmObservable.asObservable().pipe(take(1)).subscribe(result => this.onDelete(result) );    
  }

  onDelete(result :boolean)
  {
      if(result)
      {
        this.alertService.showSuccess("Registro deletado com sucesso!");
      }
  }
}
