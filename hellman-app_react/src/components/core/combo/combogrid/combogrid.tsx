import React, { useEffect } from "react";
import { ComboGridTableHeader } from "../ComboGrid";

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
const ComboGrid: React.FC<ComboProps> = ({
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
    const [rootData, setRootData] = React.useState([]);
    const [key, setKey] = React.useState("");
    const [textField, setTextField] = React.useState("");



    useEffect(() => {
        if(!comboText){
            let item = data.find((x: any) =>x.value == value);
            if(item){
               setComboText(item.text);
            }
        }

        loadData();
      
    },[data,value,text]);

    function loadData()
    {  
          if(headers){
              let keyHeader: ComboGridTableHeader =  headers.find((x: any)=>x.key == true);  
              let key = keyHeader.columnName; 
              let keyText = headers.filter((x:any)=>x.text == true);  
              let text = keyText.map((x:any)=>x.columnName);
              setKey(key);
              setTextField(text);
          }
    }

    function rowClick(event: any){
        if(!checkbox){
            setValue(event);
        }
    }

   function setValue(event: any) {
        let el = event.target;
        if(el.value === undefined){
          el = el.parentElement;
        }

        if(multiple)
        {
          setMultiipleValue(el);
        }
        else{
           setSingleValue(el);
        }
  
        uncheckAll(el);
    }

    function uncheckAll(el: any){
        if(checkbox){
            let div = findAncestor(el,'dropdown');
            let checkAll =  div.getElementsByClassName('checlAll');
            let checked : boolean = false;
            for (let i = 0; i < checkAll.length; i++) {
                checkAll[i].checked = checked;
            }
        }
    }

   function setSingleValue(el: any)
    {
        let content = findAncestor(el,'dropdown-content');
        let value =  el.getAttribute('data-value');
        let text = el.getAttribute('data-text');
        setComboText(text);
        setComboValue(value);
        
        content.classList.toggle("show");
    }

    function setMultiipleValue(el: any){
        let div = findAncestor(el,'dropdown');
      
        if(!checkbox)
           el.classList.toggle("selected");
        else
        {
          let row = findAncestor(el,'datagrid-row');
          row.classList.toggle("checked");
        }
        
        loadComboGridValue(el);
    }

    function loadComboGridValue(el: any){
        let div = findAncestor(el,'dropdown');
        let itens = div.getElementsByTagName("tr");
        let value = "";
        let text = "";
        let sep = "";

        for (let i = 0; i < itens.length; i++) {
             if((itens[i].classList.contains('selected') && !checkbox) || 
                 itens[i].classList.contains('checked') && checkbox)
             {
                 value+= sep + itens[i].getAttribute('data-value');;
                 text+= sep + itens[i].getAttribute('data-text');
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
        let div = findAncestor(el,'dropdown-content');
        div.classList.remove("show");
    }

    const changeInput = (field:any, element: any) => {
        if(field == "text"){
            setComboText(element.value);
        }
        else{
            setComboValue(element.value);
        }
    };

    function checkAll (event: any){
        let el = event.target;
        let div = findAncestor(el,'dropdown');
        let childrens =  div.getElementsByClassName('rowCheck');
        let checked : boolean = false;
        if(el.checked){
            checked = true;
        }
     
        for (let i = 0; i < childrens.length; i++) {
            childrens[i].checked = checked;
            let row = findAncestor(childrens[i],'datagrid-row');
            row.classList.toggle("checked");
        }
        
        loadComboGridValue(el);
    }

    function renderCheckboxAll(){
        if(checkbox){
            return (
                <th style={{textAlign:"center",width:"56"}} >
                   <input  onChange={($event) => checkAll($event)}  
                           type="checkbox"
                           className="checlAll"/>
                </th>
            )
        }
    }

    function renderHeader(header: any){
        return(
            <th scope="coll">
                {header.columnTitle}
            </th>
        )
    }

    function renderChecbox(){
        if(checkbox){
            return (
                <td style={{textAlign:"center"}}>
                <input 
                    type="checkbox" 
                    className="rowCheck" 
                    onChange={($event) => setValue($event)}/>
                </td>
            );
        }
    }

    function renderCell(header: any, row: any){
        return<td>
             {row[header.columnName]}
         </td>
    }

    function renderRow(row: any){
        return(
           <tr onClick={($event) => rowClick($event)}  
               data-value={row[key]} 
               data-text={row[textField]}  
               className="datagrid-row">
                  {renderChecbox()}
                  {headers.map((header: any) => {
                        return renderCell(header,row);
                  })}
             </tr>
         );
    }

    function renderGrid(){
        return (
            <table className="datagrid" >
                 <thead>
                    <tr>
                        {renderCheckboxAll()}
                        {headers.map(renderHeader)}
                    </tr>
                 </thead>
                 <tbody>
                     {data.map(renderRow)}
                 </tbody>
            </table>
        );
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
                 
                   {renderGrid()}
                   
              </div>
        </div>
    )
  };

  export default ComboGrid;