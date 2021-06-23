import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import ComboCore from '../combo.core';
import { ComboGridTableHeader } from '../combo-grid';
import ComboData from '../comboData'

@Component({
  selector: 'ComboSearch',
  templateUrl: './combosearch.component.html',
  styleUrls: ['./combosearch.component.css']
})
export class ComboSearchComponent extends ComboCore implements OnInit,OnChanges {

  @Output() comboChange = new EventEmitter<ComboData>();
  constructor() { 
    super();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
      this.loadData();
  }

  rowClick(event: any){
    if(!this.checkbox){
        this.setValue(event);
    }
  }

  setValue(event: any) {
      let el = event.target;
      let div = this.findAncestor(el,'dropdown');
      let comboText = div.getElementsByClassName('combo-text');
      let comboValue = div.getElementsByClassName('combo-value');
      let inputSearch = div.getElementsByClassName('form-search');
     
      if(this.multiple)
      {
        this.setMultiipleValue(el, comboText, comboValue);
      }
      else{
        this.setSingleValue(el, comboText, comboValue);
      }
      this.comboChange.emit(new ComboData(el.rel,this.name));
      inputSearch[0].value = "";
      this.reload(el.parentElement,"");
  }

  setSingleValue(el ,comboText , comboValue)
  {
     comboText[0].value = el.innerText;
     comboValue[0].value = el.rel;
     el.parentElement.classList.toggle("show");
  }

  setMultiipleValue(el, comboText, comboValue){
      let div = this.findAncestor(el,'dropdown');
      if(!this.checkbox)
         el.classList.toggle("selected");
      else
      {
        let row = this.findAncestor(el,'search-row');
        row.classList.toggle("checked");
      }
     
      let itens = div.getElementsByTagName("a");
      let value = "";
      let text = "";
      let sep = "";
      for (let i = 0; i < itens.length; i++) {
          if((itens[i].classList.contains('selected') && !this.checkbox) || (itens[i].classList.contains('checked') && this.checkbox))
          {
              value+= sep + itens[i].rel;
              text+= sep + itens[i].innerText;
              sep=",";
          }
      }
      comboText[0].value = text;
      comboValue[0].value = value;
  }




}
