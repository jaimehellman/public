import { Component, OnInit, ɵConsole, OnChanges } from '@angular/core';
import ComboCore from '../combo.core';
import { ComboGridTableHeader } from '../combo-grid';

@Component({
  selector: 'ComboGrid',
  templateUrl: './combogrid.component.html',
  styleUrls: ['./combogrid.component.css']
})
export class CombogridComponent extends ComboCore implements OnInit,OnChanges {

  key: string = "";
  text: string = "";
  constructor() { 
    super();
  }

  ngOnInit(): void {
      this.onLoad();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
       this.onLoad();
  }

  onLoad(){
      if(this.headers){
          let keyHeader: ComboGridTableHeader =  this.headers.find(x=>x.key == true);  
          this.key = keyHeader.columnName; 
          let keyText = this.headers.filter(x=>x.text == true);  
          this.text = keyText.map(x=>x.columnName);
      }
  }

  rowClick(event: any){
    if(!this.checkbox){
        this.setValue(event);
    }
  }

  setValue(event: any) {
      let el = event.target;
      if(el.value === undefined){
        el = el.parentElement;
      }

    
      if(this.multiple)
      {
        this.setMultiipleValue(el);
      }
      else{
        this.setSingleValue(el);
      }

      this.uncheckAll(el);
  }

  setSingleValue(el)
  {
     let div = this.findAncestor(el,'dropdown');
     let comboText =  div.getElementsByClassName('combo-text');
     let comboValue =  div.getElementsByClassName('combo-value');
     let content = this.findAncestor(el,'dropdown-content');
     comboText[0].value = el.getAttribute('text');
     comboValue[0].value = el.getAttribute('value');
     content.classList.toggle("show");
  }

  setMultiipleValue(el){
      let div = this.findAncestor(el,'dropdown');
    
      if(!this.checkbox)
         el.classList.toggle("selected");
      else
      {
        let row = this.findAncestor(el,'datagrid-row');
        row.classList.toggle("checked");
      }
      
      this.loadComboGridValue(el);
  }

 
}
