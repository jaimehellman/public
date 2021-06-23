import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import Combo from '../combo/combo';

@Component({
  selector: 'Tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit,OnChanges {
  

  @Input() checkbox: boolean;
  @Input() multiple: boolean;
  @Input() nodeValue: any;
  @Input() value: any;
  @Input() data: any;
  rootData: any;
  @Output() change = new EventEmitter<Combo>();
  @Output() cleanTree = new EventEmitter<Combo>();
  @Output() changeMultiple = new EventEmitter<Array<Combo>>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    
     if(this.nodeValue){
         this.rootData = this.data.filter(x=>x.parent === this.nodeValue);
     }
     else{
         this.rootData = this.data.filter(x=>x.parent === 0);
     }
    
  }

  rowClick(event: any){
    if(!this.checkbox){
        this.setValue(event);
    }
  }

  setValue(event: any) {
      let el = event.target;
      if(this.multiple)
      {
        this.setMultiipleValue(el);
      }
      else{
        this.setSingleValue(el);
      }
      this.checkChildrens(el);
    
  }

  setSingleValue(el)
  {
   
      let node = this.findAncestor(el,'tree-node');
      let selectNode: Combo = this.data.find(x=>x.value == node.getAttribute('rel'));
      selectNode.element = el;
      this.change.emit(selectNode);
  }

  select(node: Combo){
      if(!this.multiple)
      { 
        this.change.emit(node);
      }
  }

  setMultiipleValue(el){
      let div = this.findAncestor(el,'dropdown');
      let row = this.findAncestor(el,'tree-node');
      if(!this.checkbox)
      {
         if(el.classList.contains('span-text')){
            el.parentElement.classList.toggle("selected");;
         }
         else{
            el.classList.toggle("selected");
         }
      }
      else{
        row.classList.toggle("checked");
      }

      this.loadTreeValue(el);
   }

  toggleChildren(event){
      let el = event.target;
      let nested = el.parentElement.parentElement.querySelector(".nested");
      if(nested){
        nested.classList.toggle("active");
        el.classList.toggle("caret-down");
      }
   }

   findAncestor (el, cls) {
      while ((el = el.parentElement) && !el.classList.contains(cls)){
      };
      return el;
  }

  loadTreeValue(el)
  {
      let div = this.findAncestor(el,'dropdown');
      let itens = div.getElementsByTagName("a");
      let values = [];
      for (let i = 0; i < itens.length; i++) {
          if(itens[i].classList.contains('selected') || itens[i].classList.contains('checked')) 
          {
               values.push(itens[i].getAttribute('rel'));
          }
      }
      if(values.length > 0){
          let selectNodes = this.data.filter(x=>values.includes(x.value.toString()));
          if(selectNodes.length > 0){
              selectNodes[0].element = el;
              this.changeMultiple.emit(selectNodes);
          }
      }
      else{
         let node = new Combo();
         node.element = el;
         this.cleanTree.emit(node);
      }
  }

  clean(node: Combo){
     this.cleanTree.emit(node);
  }

  selectMultiple(nodes: Array<Combo>){
     
      this.changeMultiple.emit(nodes);
  }

  checkChildrens(el){
        if(this.checkbox){
            let checked: boolean = false;
            let row = this.findAncestor(el,'tree-row');
            let node = this.findAncestor(el,'tree-node');
            node.classList.toggle("checked");
            let itens = row.getElementsByTagName("input");
            if(el.checked){
                checked = true;
            }

            for (let i = 0; i < itens.length; i++) {
              if(el =="on"){
                  continue;
              }
              itens[i].checked = checked;
              node = this.findAncestor(itens[i],'tree-node');
              if(checked){
                node.classList.add("checked");
              }else{
                node.classList.remove("checked");
                this.unCheckParents(el);
              }
              
            }
        }
        this.loadTreeValue(el);
   }

   unCheckParents(el){
        let row = this.findAncestor(el,'tree-row');
        let rowParent = this.findAncestor(row,'tree-row');
        if(rowParent !== null && this.checkbox){
            let nodes = rowParent.getElementsByClassName("tree-node");
            nodes[0].classList.remove("checked");
            let inputs = nodes[0].getElementsByTagName("input");
            if(inputs){
                inputs[0].checked = false;
                this.unCheckParents(inputs[0]);
            }
        }
    }

}
