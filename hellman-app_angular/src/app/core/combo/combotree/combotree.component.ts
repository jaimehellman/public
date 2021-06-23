import { Component, OnInit, OnChanges } from '@angular/core';
import ComboCore from '../combo.core';
import Combo from '../combo';

@Component({
  selector: 'ComboTree',
  templateUrl: './combotree.component.html',
  styleUrls: ['./combotree.component.css']
})
export class CombotreeComponent extends ComboCore implements OnInit,OnChanges {

  
  constructor() { 
    super();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
      this.loadData();
  }

  setValue(el: any) {
   
  }

  select(node: Combo){
      if(!this.multiple)
      { 
          this.setSingleValue(node);
      }
  }

  clean(node: Combo){
      this.value = "";
      this.text = "";
      let content = this.findAncestor(node.element, 'dropdown-content');
      content.classList.toggle("show");
  }

  setSingleValue(node: Combo){
      this.value = node.value;
      this.text = node.text;
      if(node.element){
        let content = this.findAncestor(node.element, 'dropdown-content');
        content.classList.toggle("show");
      }

  }
  
  selectMultiple(nodes: Array<Combo>){

      this.value = nodes.map(x=>x.value);
      this.text = nodes.map(x=>x.text);
       let content = this.findAncestor(nodes[0].element, 'dropdown-content');
       content.classList.toggle("show");
  }



 
}
