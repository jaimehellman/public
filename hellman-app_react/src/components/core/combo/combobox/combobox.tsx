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
const ComboBox: React.FC<ComboProps> = ({
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

    function setValue(event: any){
        let el = event.target;
        let div = findAncestor(el,'dropdown');
        let comboText = div.getElementsByClassName('combo-text');
        let comboValue = div.getElementsByClassName('combo-value');
        if(multiple)
        {
            setMultiipleValue(el,comboText,comboValue);
        }
        else{
            setSingleValue(el, comboText, comboValue);
        }
    }

    function setSingleValue(el: any, comboText: any , comboValue: any)
    {
        comboText[0].value = el.innerText;
        comboValue[0].value = el.rel;
        let content = findAncestor(el,'dropdown-content');
        content.classList.toggle("show");
        setComboText(el.innerText);
        setComboValue(el.rel);
    }

    function  setMultiipleValue(el: any, comboText: any, comboValue: any){
        let div = findAncestor(el,'dropdown');
        if(!checkbox)
            el.parentElement.classList.toggle("selected");
        else{
            el.parentElement.classList.toggle("checked");
        }
        let itens = div.getElementsByTagName("a");
        let value = "";
        let text = "";
        let sep = "";
        for (let i = 0; i < itens.length; i++) {
            if((itens[i].parentElement.classList.contains('selected') && !checkbox) || 
               (itens[i].parentElement.classList.contains('checked') && checkbox))
            {
                let v = itens[i].rel;
                value+= sep + v;
                text+= sep + itens[i].innerText;
                sep=",";
            }
        }
        comboText[0].value = text;
        comboValue[0].value = value;
        setComboText(text);
        setComboValue(value);
    }

    function renderData(){
        return (<ul>{data.map(renderItem)}</ul>);
    }

    function renderItem(item: any){
        return (
             <li>
                 {renderCheckbox(item)}
                 <a rel={item.value} onClick={($event) => setValue($event)}>{item.text}</a>
             </li>
         )
    }

    function renderCheckbox(item: any){
        if(checkbox){
            return (
                <input  onChange={($event) => setValue($event)} type="checkbox" value={item.value}/> 
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
              <div onMouseLeave={($event) => out($event)} className="dropdown-content combobox">
                   {renderData()}
                   
              </div>
        </div>
    )
  };

  export default ComboBox;