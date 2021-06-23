import React, { forwardRef, useImperativeHandle, ReactNode, Children, useEffect } from "react";
import { MessageType } from "../MessageType";
import CoreUtil from "../../util/CoreUtil";

const Modal: React.FC<any> = forwardRef((props: any, ref) => {

    const [id, setId] = React.useState("");
    const [childrens, setChildrens] = React.useState(null);
 
      useEffect(() => {
      
      
      },[childrens,id])

      function OpenModal(childrens: ReactNode, data: any)
      {
          CreateContainer(childrens, data );
      }
  
    function CreateContainer(childrens: ReactNode, data: any){
	
        let modalContainer = document.getElementById("ModalContainer");
        if(modalContainer === null){
            modalContainer = document.createElement("div"); 
            modalContainer.setAttribute("id", "ModalContainer");
            modalContainer.setAttribute("style", "position:fixed;top:20px;left:100px;z-index:9999900;width: 350px;");	
            document.body.appendChild(modalContainer); 
        }

        CreateMessageContent(modalContainer, childrens, data);
    }

    function CreateMessageContent(confirmContainer: any,
                                  childrens: any, 
                                  data: any){
         let id = CoreUtil.guidGenerator();
         let nomediv = 'mdl_' + id;
         setId(nomediv);
         setChildrens(childrens);
        
    }
     useImperativeHandle(ref, () => {
        return {
            OpenModal,
        };
    });
    

    return (
        <div id={id}  className='modal show'>
             <div className='modal-dialog'>
                {childrens}
             </div>
         </div>
      );
});
export default Modal;