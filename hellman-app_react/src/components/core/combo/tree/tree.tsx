import React, { useEffect, useContext } from "react";
import Combo from "../Combo";
import TreeContext from "../combotree/context/tree-context";

interface TreeProps{
    checkbox?: boolean;
    multiple?: boolean;
    nodeValue?: any;
    value: any;
    text?: any;
    data: any;
    change?: Function;
    changeMultiple?: Function;
    cleanTree?: Function;
}
const Tree: React.FC<TreeProps> = ({ 
    checkbox,
    multiple,
    nodeValue,
    value,
    text,
    data,
    change,
    changeMultiple,
    cleanTree
 }) => {

    const [rootData, setRootData] = React.useState(new Array<Combo>());
    const { SetValue } = useContext(TreeContext);

    useEffect(() => {
        let root = loadData(data);
        setRootData(root);
    },[data]);

    function loadData(itens:any){
        let root:any = rootData;
        itens.forEach((item:any) => {
            root.push(item);
            if(item.childrens.length > 0){
                loadData(item.childrens);
            }
        });

       return root;
    }

 
    function setValue(event: any){
        let el = event.target;
        if(multiple)
        {
          setMultiipleValue(el);
        }
        else{
           setSingleValue(el);
        }
        checkChildrens(el);
    }

    function checkChildrens(el: any){
        if(checkbox){
            let checked: boolean = false;
            let row = findAncestor(el,'tree-row');
            let node = findAncestor(el,'tree-node');
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
            node = findAncestor(itens[i],'tree-node');
            if(checked){
                node.classList.add("checked");
            }else{
                node.classList.remove("checked");
                unCheckParents(el);
            }
            
            }
        }
        loadTreeValue(el);
    }
   
    function unCheckParents(el: any){
        let row = findAncestor(el,'tree-row');
        let rowParent = findAncestor(row,'tree-row');
        if(rowParent !== null && checkbox){
            let nodes = rowParent.getElementsByClassName("tree-node");
            nodes[0].classList.remove("checked");
            let inputs = nodes[0].getElementsByTagName("input");
            if(inputs){
                inputs[0].checked = false;
                unCheckParents(inputs[0]);
            }
        }
    }

    function setSingleValue(el: any)
    {
    
        let node = findAncestor(el,'tree-node');
        let selectNode:any = rootData.find((x: any)=>x.value == node.getAttribute('rel'));
        SetValue(selectNode);
    }

   function setMultiipleValue(el: any){
        let div = findAncestor(el,'dropdown');
        let row = findAncestor(el,'tree-node');
        if(!checkbox)
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
        loadTreeValue(el);
    }

    function findAncestor (el: any, cls: any) {
        while ((el = el.parentElement) && !el.classList.contains(cls)){
        };
        return el;
    } 

    function toggleChildren(event: any){
        let el = event.target;
        let nested = el.parentElement.parentElement.querySelector(".nested");
        if(nested){
            nested.classList.toggle("active");
            el.classList.toggle("caret-down");
        }
    }

   function loadTreeValue(el: any)
   {
       let div = findAncestor(el,'dropdown');
       let itens = div.getElementsByTagName("a");
       let values: any = [];
       for (let i = 0; i < itens.length; i++) {
           if((itens[i].classList.contains('selected') && !checkbox) ||
              (itens[i].classList.contains('checked') && checkbox))
           {
                values.push(itens[i].getAttribute('rel'));
           }
       }
       if(values.length > 0){
           let selectNodes = rootData.filter((x: any)=>values.includes(x.value.toString()));
           if(selectNodes.length > 0){
               selectNodes[0].element = el;
               SetValue(selectNodes);
           }
       }
       else{
          let node = new Combo();
          node.element = el;
          SetValue(node);
       }
      
   }


    function renderRoot(itens: any,parent: any){
        return (
            <ul  className={parent==0?"tree-ul":"nested"}>
                   {itens.map(renderTree)}
            </ul>
        );
    }

    function renderCheckbox(){
        if(checkbox){
           return ( <input  onChange={($event) => setValue($event)} 
                            type="checkbox"  className="rowCheck"/>
                  )
        }
        
    }

    function renderTree(item: any){
         return (
            <li className="tree-row">
               <a className="tree-node"  data-parent={item.parent}  rel={item.value}>
                   <span onClick={($event) => toggleChildren($event)} className="caret"></span>
                    {renderCheckbox()}
                   <span  className="span-text" data-rel={item.value} data-value={item.value} onClick={($event) => setValue($event)}>{item.text}</span>
               </a>
               {renderChildrens(item)}
            </li>
        )
    }

    function renderChildrens(item: any){
        if(item.childrens.length > 0){
            return (
                <>
                    {renderRoot(item.childrens,item.value)}
                </>
            );
        }
    }

    return (
        <>
            {renderRoot(data,0)}
        </>
    );
 };
 
export default Tree;