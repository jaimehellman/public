import { Component, OnInit, OnChanges } from '@angular/core';
import ComboCore from '../combo.core';

@Component({
  selector: 'ComboBox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css']
})
export class ComboboxComponent extends ComboCore implements OnInit,OnChanges {

  constructor() { 
    super();
  }

  ngOnInit(): void {
     
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
      this.loadData();
  }

  setValue(event: any) {
      let el = event.target;
      let div = this.findAncestor(el,'dropdown');
      let comboText = div.getElementsByClassName('combo-text');
      let comboValue = div.getElementsByClassName('combo-value');
      if(this.multiple)
      {
         this.setMultiipleValue(el,comboText,comboValue);
      }
      else{
         this.setSingleValue(el, comboText, comboValue);
      }
  }

  setSingleValue(el ,comboText , comboValue)
  {
     comboText[0].value = el.innerText;
     comboValue[0].value = el.rel;
     let content = this.findAncestor(el,'dropdown-content');
     content.classList.toggle("show");
  }

  setMultiipleValue(el ,comboText , comboValue)
  {
      let div = this.findAncestor(el,'dropdown');
      if(!this.checkbox)
         el.parentElement.classList.toggle("selected");
      else{
         el.parentElement.classList.toggle("checked");
      }
      let itens = div.getElementsByTagName("a");
      let value = "";
      let text = "";
      let sep = "";
      for (let i = 0; i < itens.length; i++) {
          if((itens[i].parentElement.classList.contains('selected') && !this.checkbox) || (itens[i].parentElement.classList.contains('checked') && this.checkbox))
          {
              let v = itens[i].rel;
              value+= sep + v;
              text+= sep + itens[i].innerText;
              sep=",";
          }
      }
      comboText[0].value = text;
      comboValue[0].value = value;
    }
}
