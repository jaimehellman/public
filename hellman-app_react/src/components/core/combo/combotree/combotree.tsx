import React, { useEffect, Children } from "react";
import Combo from "../Combo";
import Tree from "../tree/tree";
import TreeContext from "./context/tree-context";

interface ComboProps {
    id: string;
    name: string;
    value: string
    text?: string,
    checkbox?: boolean,
    multiple?: boolean
    data?: any
}
const ComboTree: React.FC<ComboProps> = ({
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
    const [rootData, setRootData] = React.useState(data);

    useEffect(() => {
       
        if(!comboText){
            let item = data.find((x: any) =>x.value == value);
            if(item){
               setComboText(item.text);
            }
        }
        
        setRoot();
    },[data,value,text]);

    function setRoot(){
        let root = setTree(data,0);
        setRootData(root);
    }

    function setTree(root: any, parent: any){
        let elements= root.filter((x: any)=> x.parent == parent);
        elements.forEach((item: any) => {
            let childrens = root.filter((x: any)=> x.parent == item.value);
            item["childrens"] = [];
            if(childrens.length > 0){
                item["childrens"] = childrens;
                setTree(root,item.value);
            }
        });
       return elements;
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
        if(div !== null){
            div.classList.remove("show");
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

    function SetValue(value: any){
        if(value.text == ""){
            clean(value);
            return false;
        }

        if(multiple){
            selectMultiple(value);
        }
        else{
            setSingleValue(value)
        }
    }

    function select(node: Combo){
        if(!multiple)
        { 
            setSingleValue(node);
        }
    }

    function setSingleValue(node: Combo){
       
        if(node){
            let value = node.value;
            let text = node.text;
            if(node.element){
                let content = findAncestor(node.element, 'dropdown-content');
                content.classList.toggle("show");
            }
            setComboValue(value);
            setComboText(text);
        }
    }



    function selectMultiple(nodes: Array<Combo>){
        let value =""; 
        let text = "";
        let sep="";
        nodes.forEach(function (node) {
            value += sep + node.value;
            text += sep + node.text;
            sep=",";
        });
        setComboValue(value);
        setComboText(text);
    }

    function clean(node: Combo){
        value = "";
        text = "";
        setComboValue(value);
        setComboText(text);
    }

    return (
        <div className="dropdown">
            <TreeContext.Provider
             value={{
                SetValue,
              }}>
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
                    <div onMouseLeave={($event) => out($event)} className="dropdown-content">
                        <div className="tree">
                            <Tree 
                                checkbox={checkbox}
                                multiple={multiple}
                                value={value}
                                nodeValue={0}
                                data={rootData}
                            />
                        </div>
                     </div>
              </TreeContext.Provider>
        </div>
    )
  };

  export default ComboTree;