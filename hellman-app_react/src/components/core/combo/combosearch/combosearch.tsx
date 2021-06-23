import React, { useEffect } from "react";

interface ComboProps {
    id: string;
    name: string;
    value: string
    text?: string,
    checkbox?: boolean,
    multiple?: boolean
    data?: any
}
const ComboSearch: React.FC<ComboProps> = ({
    id,
    name,
    value,
    text,
    checkbox,
    multiple,
    data
  }) => {

    const [comboValue, setComboValue] = React.useState(value);
    const [comboText, setComboText] = React.useState(text);

    useEffect(() => {
        if(!comboText){
            let item = data.find((x: any) =>x.value == value);
            if(item){
               setComboText(item.text);
            }
        }
      
    },[data,value,text]);
   
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

    function rowClick(event: any){
        if(!checkbox){
            setValue(event);
        }
    }
    

    function setValue(event: any){
        let el = event.target;
        let div = findAncestor(el,'dropdown');
        let comboText = div.getElementsByClassName('combo-text');
        let comboValue = div.getElementsByClassName('combo-value');
        let inputSearch = div.getElementsByClassName('form-search');
        
        if(multiple)
        {
            setMultiipleValue(el, comboText, comboValue);
        }
        else{
            setSingleValue(el, comboText, comboValue);
        }
        inputSearch[0].value = "";
        reload(el.parentElement,"");
    }

    function setSingleValue(el: any, comboText: any , comboValue: any)
    {
        comboText[0].value = el.innerText;
        comboValue[0].value = el.rel;
        el.parentElement.classList.toggle("show");
        setComboText(el.innerText);
        setComboValue(el.rel);
    }

    function  setMultiipleValue(el: any, comboText: any, comboValue: any){
        let div = findAncestor(el,'dropdown');
        if(!checkbox)
            el.classList.toggle("selected");
        else
        {
            let row = findAncestor(el,'search-row');
            row.classList.toggle("checked");
        }
        
        let itens = div.getElementsByTagName("a");
        let value = "";
        let text = "";
        let sep = "";
        for (let i = 0; i < itens.length; i++) {
            if((itens[i].classList.contains('selected') && !checkbox) || 
               (itens[i].classList.contains('checked') && checkbox))
            {
                value+= sep + itens[i].rel;
                text+= sep + itens[i].innerText;
                sep=",";
            }
        }
        comboText[0].value = text;
        comboValue[0].value = value;
        setComboText(text);
        setComboValue(value);
    }

    function filter(event: any) {
        let el = event.target;
        let input, filter, ul, li, a, i;
        let div = findAncestor(el,'dropdown');
        input = div.getElementsByClassName('form-search');
        filter = input[0].value.toUpperCase();
        div = el.parentElement.parentElement;
        reload(div,filter);
    }

    function reload(div: any,filter: any){
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

    function renderData(){
        return (<>{data.map(renderItem)}</>);
    }

    function renderItem(item: any){
        return (
             <>
                 <a 
                     className="search-row" 
                     rel={item.value} 
                     onClick={($event) => rowClick($event)}>
                    {renderCheckbox(item)}    {item.text}
                  
                </a>
             </>
         )
    }

    function renderCheckbox(item: any){
        if(checkbox){
            return (
                <input 
                   type="checkbox" 
                   className="rowCheck"
                   value={item.value}
                   onChange={($event) => setValue($event)} 
                /> 
            )
        }
    }

    const changeInput = (field:any, element: any) => {
        if(field == "text"){
            setComboText(element.value);
        }
        else{
            setComboValue(element.value);
        }
    };


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
              <div  onMouseLeave={($event) => out($event)} className="dropdown-content search">
                   <input type="text" className="form-control form-search" 
                   placeholder="Search.." onKeyUp={($event) => filter($event)}/>
                   {renderData()}
                   
              </div>
        </div>
    )
  };

  export default ComboSearch;