import { Injectable, EventEmitter } from '@angular/core';
import TableSettings, { GridviewType, TableHeader, ActionPosition, Action } from './table-settings';


@Injectable() 
export class GridviewService {

    actions: any = [

    ];

    change = new EventEmitter<TableSettings>();
    
    changeSettings (
      id : string, type: GridviewType, data : any, 
      hasActions: boolean,actionPosition: ActionPosition, actions: Array<Action>,
      headers: any, pagination: boolean,perPage: number, checkbox: boolean ) 
    {

         let settings : TableSettings = { 
            id: id, 
            type: type, 
            data: data,
            hasActions: hasActions,
            actionPosition : actionPosition,
            actions: actions,
            headers: headers as Array<TableHeader>,
            pagination: pagination,
            perPage: perPage,
            checkbox: checkbox
          };
          this.change.emit(settings);
    }

    defineSettings(settings : any){
        this.changeSettings(
           settings.id, 
           settings.type,
           settings.data, 
           settings.hasActions,
           settings.actionPosition,
           settings.actions,
           settings.headers,
           settings.pagination,
           settings.perPage,
           settings.checkbox,
       );
    }

    setData(settings : any){
     
      if(settings.actions)
      {
        this.actions = settings.actions;
      }
      this.changeSettings(
         "",
         GridviewType.Inline,
         settings.data, 
         false,
         ActionPosition.Left,
         this.actions,
         settings.headers,
         true,
         5,
         false
     );
  }
}