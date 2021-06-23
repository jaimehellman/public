import { OnInit } from '@angular/core';
import { GridviewService } from './gridview.service';
import TableSettings from './table-settings';

export default abstract class GrdiviewCoreComponent  {
   
    
    public editting: boolean;
    private formData: any;
    settings: TableSettings = new TableSettings();
    page: number = 1; 
    totalRecords: number = 0;
    key: string;
    constructor() { 
       
    }

    setEdit(editting : boolean)
    {
       this.editting = editting;
    }

    isEdit()
    {
        return this.editting;
    }

    insertInline(){
        this.setEdit(true);
    }

    editInline(item : any){
        item.editting = true;  
    }

    cancelEditInline(item : any){
        item.editting = false;  
    }

    cancelInsertInline(){
        this.setEdit(false);
    }

    abstract saveInline(formInline : any, action : string);

    abstract deleteInline(formInline : any);

    changePage(p: number){
        this.page = p;
    }
  
    showLine(line){
      let min = line >= (this.page-1)*this.settings.perPage;
      let max = line < this.page * this.settings.perPage;
      return !(min && max);
    }

    getKey(){
       let k =  this.settings.headers.find(x=> x.key);
       if(k){
          this.key = k.columnName;
       }
    }
}