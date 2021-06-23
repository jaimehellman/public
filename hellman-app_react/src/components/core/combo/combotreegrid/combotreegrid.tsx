import React, { useEffect } from "react";
import { ComboTreeGridTableHeader } from "../ComboGrid";
import ComboSearch from "../combosearch/combosearch";

interface ComboProps {
    id: string;
    name: string;
    value: string
    text?: string,
    checkbox?: boolean,
    multiple?: boolean,
    headers?: any,
    data?: any
}
const ComboTreeGrid: React.FC<ComboProps> = ({
    id,
    name,
    value,
    text,
    checkbox,
    multiple,
    headers,
    data
  }) => {
    
    const [comboValue, setComboValue] = React.useState(value);
    const [comboText, setComboText] = React.useState(text);
    const [key, setKey] = React.useState("");
    const [textValue, setTextValue] = React.useState("");
    const [treeField, setTreeField] = React.useState("");
    const [sortData, setSortData] = React.useState(data);
    let sort = new Array<any>();

    
   

    useEffect(() => {
        loadData();
    },[value,text,data]);


    function loadData(){
        if(headers){
            let keyHeader: ComboTreeGridTableHeader =  headers.find((x: any)=>x.key == true);  
            let key = keyHeader.columnName; 
            setKey(key);
            let treeField: ComboTreeGridTableHeader =  headers.find((x: any)=>x.treeField == true); 
            setTreeField(treeField.columnName);
            let keyText = headers.find((x: any)=>x.text == true);  
            setTextValue(keyText.columnName);
            let sortData  =  setLevel(0,0);
            setSortData(sortData);
            setCombo(key,keyText.columnName);
        }
    }

    function setCombo(key: string,keyText: string){
        if(!comboText && data){
            let item = data.find((x: any) =>x[key] == value);
            if(item){
               setComboText(item[keyText]);
            }
        }
    }

    function setLevel(parent: any,level: number){
      
        if(data){
           let children = data.filter((x: any)=>x[treeField] == parent);
           if(children.length >  0){
              level++;
           }
         
           children.forEach((item: any) => {
               let k = item[key];
               item.level = level-1;
               sort.push(item);
               setLevel(k,level);
           });
        }  
        return sort;
      
   }

   function rowClick(event: any){
       if(!checkbox){
        setValue(event);
       }
   }

   function setValue(event: any) {
        let el = event.target;
        if(multiple)
        {
            setMultiipleValue(el);
            if(checkbox){
                onCheckAllTreeGrid(el);
            }
            
        }
        else{
            setSingleValue(el);
        }
    }

    function setSingleValue(el: any)
    {
       let row = findAncestor(el,'treegrid-row');
       let text = row.getAttribute('data-text');
       let value = row.getAttribute('data-value');
       setComboValue(value);
       setComboText(text);
    }

    function setMultiipleValue(el: any){
        let div = findAncestor(el,'dropdown');  
        let row = findAncestor(el,'treegrid-row');
  
        if(!checkbox){
           row.classList.toggle("selected");
        }
        else{
           row.classList.toggle("checked");
        }
        loadComboTreeGridValue(el);
    }

    function unCheckAllTreeGrid(el: any){
        if(el.checked == false){
            let div = findAncestor(el,'treegrid');  
            let input = div.getElementsByClassName("checkAll");
            input[0].checked = false;
            uncheckAllParents(el);
            uncheckAllChildren(el);
        }
    }

    function uncheckAllParents(el: any){
        let div = findAncestor(el,'treegrid');  
        let row = findAncestor(el,'treegrid-row');
        let itens = div.getElementsByClassName("treegrid-row");
        for (let i = 0; i < itens.length; i++) {
            if(!itens[i].classList.contains('all')){
                if(itens[i].getAttribute("data-value") == row.getAttribute("data-rel")){
                    itens[i].classList.remove('checked');
                    let input = itens[i].getElementsByClassName("rowCheck");
                    input[0].checked = false;
                    uncheckAllParents(input[0]);
                }
            }
         }
         loadComboTreeGridValue(el);
    }

    function uncheckAllChildren(el: any){
        let row = findAncestor(el,'treegrid-row');
        let div = findAncestor(el,'treegrid');  
        let itens = div.getElementsByClassName("treegrid-row");
        for (let i = 0; i < itens.length; i++) {
            if(itens[i].getAttribute("data-rel") == row.getAttribute("data-value")){
                itens[i].classList.remove('checked');
                let input = itens[i].getElementsByClassName("rowCheck");
                input[0].checked = false;
                uncheckAllChildren(input[0]);
            }
        }
    }

    function onCheckAll(event: any){
        if(checkbox){
           onCheckAllTreeGrid(event.target);
        }
    }

   function onCheckAllTreeGrid(el: any){
        let checked: boolean = false;
        if(el.checked){
            checked = true;
        }
      
        let div = findAncestor(el,'treegrid');  
        let row = findAncestor(el,'treegrid-row'); 
        let itens = div.getElementsByClassName("treegrid-row");

        for (let i = 0; i < itens.length; i++) {
            if(!itens[i].classList.contains('all')){
                if(row.classList.contains('all')){
                     checkItens(itens[i], checked, true);
                }else{
                    let parent = row.getAttribute('data-value');
                    if(itens[i].getAttribute("data-rel") == parent){
                        checkItens(itens[i], checked, false);
                    }
                }
            }
        }

        loadComboTreeGridValue(el);
    }

    function  checkItens(item: any,checked: any, all: any){
        let input = item.getElementsByClassName("rowCheck");
        input[0].checked = checked;
        if(checked){
            item.classList.add('checked');
            if(!all){
                onCheckAllTreeGrid(input[0]);
            }
        }
        else{
            item.classList.remove('checked');
        }
    }

    function loadComboTreeGridValue(el: any){
        let div = findAncestor(el,'dropdown');
        let itens = div.getElementsByClassName("treegrid-row");
        let value = "";
        let text = "";
        let sep = "";
        for (let i = 0; i < itens.length; i++) {
            if((itens[i].classList.contains('selected') && !checkbox) || 
               (itens[i].classList.contains('checked') && checkbox))
            {
                value += sep + itens[i].getAttribute('data-value');
                text +=  sep + itens[i].getAttribute('data-text');
                sep=",";
            }
        }
        setComboValue(value);
        setComboText(text);
    }



    function toggle(event: any){
        let el = event.target;
        let div = findAncestor(el,'dropdown');
        let  element = div.getElementsByClassName('dropdown-content');
        if(!element[0].classList.contains('show')){
            element[0].classList.toggle("show");
        }
    }

    function findAncestor (el: any, cls: any) {
        while ((el = el.parentElement) && !el.classList.contains(cls)){
        };
        return el;
    }

    function out(event: any){
        let el = event.target;
       // el.classList.remove("show");
    }

    const changeInput = (field:any, element: any) => {
        if(field == "text"){
            setComboText(element.value);
        }
        else{
            setComboValue(element.value);
        }
    };

    function renderTreeGrid(){
        return (
            <div className="treegrid">
                <div className="treegrid-table">
                    <div className="treegrid-row all level-0">
                        <div className="treegrid-cell treegrid-header w10">
                             {renderHeaderCheckbox()}
                        </div>
                        {headers.map(renderHeader)}
                    </div>
                    {sortData.map(renderData)}
                </div>
            </div>
        )
    }

    function renderHeaderCheckbox(){
        if(checkbox){
             return (
               <input  type="checkbox" 
                onChange={($event) => onCheckAll($event)}  
                className="checkAll"/>
             )
         }
     }
 
     function renderHeader(header: any){
        if(!(header.key || header.treeField)){
             return(
                 <div key={"tree"+header.columnTitle} className="treegrid-cell treegrid-header">{header.columnTitle}</div>
             )
        }
     }

     function toggleCollapse(event: any){
        let el = event.target;
        let div = findAncestor(el,'dropdown');
        let  treegrid = findAncestor(el,'treegrid-table');
        let row = findAncestor(el,'treegrid-row');
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
              if(childrens[i].getAttribute('data-rel') == row.getAttribute('data-value')){
                 if(closed){
                    childrens[i].style.display = "table-row";
                 }else{
                     childrens[i].style.display = "none";
                 }
              }
         }
     }

     function renderCheckbox(item: any){
        if(checkbox){ 
            return(
                <input  type="checkbox"  
                        onChange={($event) => setValue($event)} 
                        value={item[key]} 
                        className="rowCheck"/>
            )
        }
     }

     function renderData(row: any){
        return (
                <div  
                    key={"row"+row[key]}
                    data-value={row[key]}
                    data-rel={row[treeField]}
                    data-text={row[textValue]}
                    className={"treegrid-row level-" +row['level']}>
                     <div className="treegrid-cell cell-arrow-left">
                         <i onClick={($event) => toggleCollapse($event)}  className="caret tree-arrow-right"></i> 
                         {renderCheckbox(row)}
                         <span data-value={row[key]}  data-text={row[textValue]}
                               onClick={($event) => setValue($event)} >
                              {row[key]}
                        </span>
                     </div>
                     {headers.map((header: any) => {
                        return renderCell(header,row);
                  })}
                </div>
        )
     }

     function renderCell(header: any, row: any){
        if(!(header.key || header.treeField)){
              return(
                <div key={header.columnTitle+row[key]} onClick={($event) => rowClick($event)}  className="treegrid-cell cell-text w55">
                    <span>{ row[header.columnName]}</span>
                </div>
              )
        }
     }

    return (
       <div className="dropdown">
           <input type="text" 
                  className="form-control combo-text" 
                  defaultValue={comboText}
                  onChange={($event) => changeInput("text",$event.target)}
                  onKeyUp={($event) => toggle($event)}
             />
             <input type="hidden" 
                    className="combo-value" 
                    id={id} 
                    name={name} 
                    onChange={($event) => changeInput("value",$event.target)}
                    defaultValue={comboValue} />
              <span onClick={($event) => toggle($event)}  className="text-addon"></span>
              <div  onMouseLeave={($event) => out($event)} className="dropdown-content">
                   {renderTreeGrid()}
              </div>
        </div>
    )
};

export default ComboTreeGrid;