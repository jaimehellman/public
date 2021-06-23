import { Component, OnInit, Input, OnChanges } from "@angular/core";

@Component({
    selector: 'app-combobox',
    template: '<div></div>'
})
export default abstract class ComboCore implements OnInit {
   

   @Input() id: string;
   @Input() name: string;
   @Input() value: any;
   @Input() multiple: boolean = false;
   @Input() checkbox: boolean= false;;
   @Input() data: any;
   @Input() headers: any;
   text: any = "";
   rootData: any;
   
   constructor() { }

   ngOnInit(): void {
   }

   loadData()
   {  
        if(this.value){

            let vArray = []
            if(this.value.toString().indexOf(",") >=0)
            {
                vArray = this.value.toString().split(",");
            }
            else{
                vArray.push(this.value.toString());
            } 
            if(this.value && this.data){
                let vCurrent = this.data.filter(x=>vArray.includes(x.value.toString()));
                if(vCurrent)
                   this.text = vCurrent.map(x=>x.text);
                this.rootData = this.data.filter(x=>x.parent === 0);
            }
        }  
   }

   abstract setValue(el: any);

   toggle(event) {
        let el = event.target;
        let div = this.findAncestor(el,'dropdown');
        let  element = div.getElementsByClassName('dropdown-content');
        if(!element[0].classList.contains('show')){
            element[0].classList.toggle("show");
        }
   }
   
   findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls)){
        };
        return el;
    }

    out(event){
        let el = event.target;
        el.classList.remove("show");
    }

    filter(event) {
        let el = event.target;
        let input, filter, ul, li, a, i;
        let div = this.findAncestor(el,'dropdown');
        input = div.getElementsByClassName('form-search');
        filter = input[0].value.toUpperCase();
        div = el.parentElement.parentElement;
        this.reload(div,filter);
    }

    reload(div,filter){
        let itens = div.getElementsByTagName("a");
        let txtValue = "";
        for (let i = 0; i < itens.length; i++) {
            txtValue = itens[i].textContent || itens[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                itens[i].style.display = "";
            } else {
                itens[i].style.display = "none";
            }
        }
    }

    toggleCollapse(event){
       let el = event.target;
       let div = this.findAncestor(el,'dropdown');
       let  treegrid = this.findAncestor(el,'treegrid-table');
       let row = this.findAncestor(el,'treegrid-row');
       let childrens =  div.getElementsByClassName('treegrid-row');
       let closed = el.classList.contains('caret');
       if(closed)
       {
           el.classList.remove("caret");
           el.classList.add("caret-down");
       }
       else{
           el.classList.add("caret");
           el.classList.remove("caret-down");
       }
       
       for (let i = 0; i < childrens.length; i++) {
             if(childrens[i].getAttribute('rel') == row.getAttribute('value')){
                if(closed){
                   childrens[i].style.display = "table-row";
                }else{
                    childrens[i].style.display = "none";
                }
             }
        }
    }

    checkAll (event){
        let el = event.target;
        let div = this.findAncestor(el,'dropdown');
        let childrens =  div.getElementsByClassName('rowCheck');
        let checked : boolean = false;
        if(el.checked){
            checked = true;
        }
     
        for (let i = 0; i < childrens.length; i++) {
            childrens[i].checked = checked;
            let row = this.findAncestor(childrens[i],'datagrid-row');
            row.classList.toggle("checked");
        }
        
        this.loadComboGridValue(el);
    }

    uncheckAll(el){
        if(this.checkbox){
            let div = this.findAncestor(el,'dropdown');
            let checkAll =  div.getElementsByClassName('checlAll');
            let checked : boolean = false;
            for (let i = 0; i < checkAll.length; i++) {
                checkAll[i].checked = checked;
            }
        }
    }

    loadComboGridValue(el){
        let div = this.findAncestor(el,'dropdown');
        let comboText =  div.getElementsByClassName('combo-text');
        let comboValue =  div.getElementsByClassName('combo-value');
        let itens = div.getElementsByTagName("tr");
        let value = "";
        let text = "";
        let sep = "";
        for (let i = 0; i < itens.length; i++) {
            if((itens[i].classList.contains('selected') && !this.checkbox) || 
               (itens[i].classList.contains('checked') && this.checkbox))
             {
                 value+= sep + itens[i].getAttribute('value');;
                 text+= sep + itens[i].getAttribute('text');
                 sep=",";
             }
         }
         comboText[0].value = text;
         comboValue[0].value = value;
   
     }


    onCheckAll(event){
        if(this.checkbox){
           this.onCheckAllTreeGrid(event.target);
        }
    }

    onCheckAllTreeGrid(el){
        let checked: boolean = false;
        if(el.checked){
            checked = true;
        }
      
        let div = this.findAncestor(el,'treegrid');  
        let row = this.findAncestor(el,'treegrid-row'); 
        let itens = div.getElementsByClassName("treegrid-row");

        for (let i = 0; i < itens.length; i++) {
            if(!itens[i].classList.contains('all')){
                if(row.classList.contains('all')){
                     this.checkItens(itens[i], checked, true);
                }else{
                    let parent = row.getAttribute('value');
                    if(itens[i].getAttribute("rel") == parent){
                        this.checkItens(itens[i], checked, false);
                    }
                }
            }
        }
        this.loadComboTreeGridValue(el);

    }

 
    unCheckAllTreeGrid(el){
        if(el.checked == false){
            let div = this.findAncestor(el,'treegrid');  
            let input = div.getElementsByClassName("checkAll");
            input[0].checked = false;
            this.uncheckAllParents(el);
            this.uncheckAllChildren(el);
        }
    }

    uncheckAllParents(el){
        let div = this.findAncestor(el,'treegrid');  
        let row = this.findAncestor(el,'treegrid-row');
        let itens = div.getElementsByClassName("treegrid-row");
        for (let i = 0; i < itens.length; i++) {
            if(!itens[i].classList.contains('all')){
                if(itens[i].getAttribute("value") == row.getAttribute("rel")){
                    itens[i].classList.remove('checked');
                    let input = itens[i].getElementsByClassName("rowCheck");
                    input[0].checked = false;
                    this.uncheckAllParents(input[0]);
                }
            }
         }
         this.loadComboTreeGridValue(el);
    }

    uncheckAllChildren(el){
        let row = this.findAncestor(el,'treegrid-row');
        let div = this.findAncestor(el,'treegrid');  
        let itens = div.getElementsByClassName("treegrid-row");
        for (let i = 0; i < itens.length; i++) {
            if(itens[i].getAttribute("rel") == row.getAttribute("value")){
                itens[i].classList.remove('checked');
                let input = itens[i].getElementsByClassName("rowCheck");
                input[0].checked = false;
                this.uncheckAllChildren(input[0]);
            }
        }
        
    }

    checkItens(item,checked, all){
        let input = item.getElementsByClassName("rowCheck");
        input[0].checked = checked;
        if(checked){
            item.classList.add('checked');
            if(!all){
                this.onCheckAllTreeGrid(input[0]);
            }
        }
        else{
            item.classList.remove('checked');
        }
    }

    loadComboTreeGridValue(el){
        let div = this.findAncestor(el,'dropdown');
        let comboText =  div.getElementsByClassName('combo-text');
        let comboValue =  div.getElementsByClassName('combo-value');
        let itens = div.getElementsByClassName("treegrid-row");
        let value = "";
        let text = "";
        let sep = "";
        for (let i = 0; i < itens.length; i++) {
            if((itens[i].classList.contains('selected') && !this.checkbox) || 
                (itens[i].classList.contains('checked') && this.checkbox))
            {
                value += sep + itens[i].getAttribute('value');
                text +=  sep + itens[i].getAttribute('text');
                sep=",";
            }
        }
        comboText[0].value = text;
        comboValue[0].value = value;
    }
  
   

}