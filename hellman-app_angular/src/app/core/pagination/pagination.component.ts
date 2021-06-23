import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import PaginationSettings, { Page } from './pagination';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit,OnChanges {
 
  page : number=1;
  pages : Array<Page> = new Array<Page>();
  pageShow : number = 6;
  @Input() settings : PaginationSettings;
  @Output() pageChange = new EventEmitter<number>();
  
  constructor(public paginationService : PaginationService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    setTimeout(() => {
      this.setPageSettings();
    },100);

  }

  onPage(page : number){
    this.page = page;
    this.setPageSettings();
  }

  onNext(page : number){
    this.page = ++page;
    this.setPageSettings();
  }

  onPrevious(page : number){
    this.page = --page;
    this.setPageSettings();
  }


  setPageSettings(){
    if(this.settings){
        let aux = this.settings.totalRecords%this.settings.perPage;
        let countPages = Math.floor(this.settings.totalRecords/this.settings.perPage);
        if(aux !== 0)
        {
          countPages +=1;
        }
        
        if(countPages == 1){
          this.page = 1;
        }
        this.showPages(countPages);
        this.pageChange.emit(this.page);
     }
  }
  
  showPages(countPages: number)
  {
      this.pages = [];
      let count = 1;
      for(let i = 0;i < countPages;i++){
          let show = false;
          if(count < this.page + this.pageShow)
          {
             show= true;
          }
          this.pages.push(new Page(count, show));
          count++;
      }
  }

  activePage(page : any)
  {
    
    let active: boolean = false;
    if(page == this.page){
      active = true;
    }
    return {
      'active': active
    }
  }

  disabledPage(page : number, type: string)
  {
    
    let disabled: boolean = false;
    if(page == 1 && type == "P"){
      disabled = true;
    }else if(page == this.pages.length && type == "N"){
      disabled = true;
    }
    return {
      'disabled': disabled
    }
  }

  
}
