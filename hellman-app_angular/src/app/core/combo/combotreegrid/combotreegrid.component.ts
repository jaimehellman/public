import { Component, OnInit, OnChanges } from '@angular/core';
import ComboCore from '../combo.core';
import { ComboTreeGridTableHeader } from '../combo-grid';

@Component({
  selector: 'ComboTreeGrid',
  templateUrl: './combotreegrid.component.html',
  styleUrls: ['./combotreegrid.component.css']
})
export class CombotreegridComponent extends ComboCore implements OnInit,OnChanges {
  
  
  key: string = "";
  text: string = "";
  treeField: string = "";
  levelList: Array<any> = [];
  sortData: any = [];
  constructor() {
    super();
  }

ngOnInit(): void {
   
}

ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
     this.onLoad();
}

onLoad(){
    if(this.headers){
        let keyHeader: ComboTreeGridTableHeader =  this.headers.find(x=>x.key == true);  
        this.key = keyHeader.columnName; 
        let treeField: ComboTreeGridTableHeader =  this.headers.find(x=>x.treeField == true); 
        this.treeField =  treeField.columnName;
        let keyText = this.headers.filter(x=>x.text == true);  
        this.text = keyText.map(x=>x.columnName);
        this.setLevel(0,0);
    }
}

setLevel(parent: any,level: number){
     let treeField = this.treeField ;
     let key = this.key ;
     if(this.data){
        let children = this.data.filter(x=>x[treeField] == parent);
        if(children.length >  0){
          level++;
        }
        children.forEach(item => {
            let k = item[key];
            item.level = level-1;
            this.sortData.push(item);
            this.setLevel(k,level);
        });
     }  
}

setValue(event: any) {
      let el = event.target;
      if(this.multiple)
      {
        this.setMultiipleValue(el);
        this.onCheckAllTreeGrid(el);
      }
      else{
        this.setSingleValue(el);
      }
  }

  setSingleValue(el)
  {
   
     let div = this.findAncestor(el,'dropdown');
     let comboText =  div.getElementsByClassName('combo-text');
     let comboValue =  div.getElementsByClassName('combo-value');
     let row = this.findAncestor(el,'treegrid-row');
     comboText[0].value =  row.getAttribute('text');
     comboValue[0].value = row.getAttribute('value');
     let content = this.findAncestor(el,'dropdown-content');
     content.classList.toggle("show");
  }

  setMultiipleValue(el){
      let div = this.findAncestor(el,'dropdown');  
      let row = this.findAncestor(el,'treegrid-row');

      if(!this.checkbox){
         row.classList.toggle("selected");
      }
      else{
         row.classList.toggle("checked");
      }
      this.loadComboTreeGridValue(el);
  }

}
