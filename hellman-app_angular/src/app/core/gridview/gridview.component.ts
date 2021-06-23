import { Component, OnInit, Input, OnChanges, ViewChild, OnDestroy, ɵConsole, Output, EventEmitter } from '@angular/core';
import TableSettings, { TableHeader, GridviewType, ActionPosition } from './table-settings';
import { Subscription } from 'rxjs';
import StringUtil from '../util/string-util';
import { GridviewService } from './gridview.service';



@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css']
})
export class GridviewComponent  implements  OnInit,OnChanges,OnDestroy {
  
  @Input() id: string;
  @Input() type: GridviewType;
  @Input() hasActions: boolean;
  @Input() actionPosition: ActionPosition;
  @Input() pagination: boolean;
  @Input() perPage: number;
  @Input() checkbox : boolean;
  @Input() controller : string;
  @Input() keyValue : any;
  @Input() disabledEdit : boolean;

  data: any;
  settings: TableSettings = new TableSettings();
  headers: Array<TableHeader> = new Array<TableHeader>(); 

  subscription: Subscription;
  @Output() reload = new EventEmitter<any>();

  constructor( 
    public gridviewService: GridviewService
    ) { 
  }

  ngOnInit() {
    this.reloadSettings(); 
  }

  ngOnChanges() {
    this.reloadSettings(); 
  }
  
  reloadSettings(){
   this.changeSettings(); 
   this.subscription = this.gridviewService.change.subscribe(settings => this.loadData(settings) );
 }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadData(settings){
    this.settings.headers = settings.headers;
    this.settings.data = settings.data;
    this.settings.actions = settings.actions;
  }

  changeSettings(){
     if(this.id)
     {
        this.settings.id = this.id;
     }
     if(this.type)
     {
        this.settings.type = GridviewType[StringUtil.ucfirst(this.type.toString())];
     }
     if(this.actionPosition)
     {
      this.settings.actionPosition = ActionPosition[StringUtil.ucfirst(this.actionPosition.toString())];
     }
     if(this.pagination)
     {
        this.settings.pagination = this.pagination;
     }
     if(this.perPage)
     {
        this.settings.perPage = this.perPage;
     }
     if(this.checkbox)
     {
        this.settings.checkbox = this.checkbox;
     }
     if(this.controller)
     {
        this.settings.controller = this.controller.toLowerCase();
     }
     if(this.keyValue)
     {
        this.settings.keyValue = this.keyValue;
     }
     if(this.disabledEdit)
     {
        this.settings.disabledEdit = this.disabledEdit;
     }
  }

  reloadGrid(res: any){
      this.reload.emit(res);
      this.reloadSettings(); 
  }
}
