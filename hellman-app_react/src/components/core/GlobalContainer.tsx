import React, { useRef, ReactNode } from "react";
import GlobalContext from "./GlobalContextType";

import { MessageType } from "./message/MessageType";

import Alert from "./message/alert/Alert";
import Confirm from "./message/confirm/confirm";
import Message from "./message/message/Message";
import Modal from "./message/modal/Modal";
import Toast from "./message/toast/Toast";



interface PropTypes {
    children?: ReactNode;
}


const GlobalContainer: React.FC<PropTypes> = ({ children }) => {
    const refAlert = useRef(null);
    const refConfirm = useRef(null);
    const refMenssage = useRef(null);
    const refToast = useRef(null);
    const refModal = useRef(null);
    const [load, setLoad] = React.useState(false);


    function OpenAlert(type: MessageType, message: string, redirect: string) {
        if (null !== refAlert.current) {
            const refer = refAlert.current as any;
            refer.OpenAlert(message, type, redirect);
        }
    }

    function OpenConfirm(title: string, message: string, okText: string, cancelText: string ) {
      if (null !== refConfirm.current) {
          const refer = refConfirm.current as any;
          refer.OpenConfirm(title, message, okText, cancelText);
      }
  }
    
    function OpenMessage(type: MessageType, message: string, redirect: string) {
        if (null !== refMenssage.current) {
            const refer = refMenssage.current as any;
            refer.OpenMessage("Atenção", message, type, redirect);
        }
    }

    function OpenModal(childrens: ReactNode, data: any) {
        if (null !== refModal.current) {
            const refer = refModal.current as any;
            setLoad(true);
            refer.OpenModal(childrens, data);
        }
    }

    function OpenToast(title: string, type: MessageType, message: string, redirect: string, icon: string) {
        if (null !== refToast.current) {
            const refer = refToast.current as any;
            refer.OpenToast(title, message, type, redirect, icon);
        }
    }

    function OpenMsg(type: MessageType, title: string, message: string, redirect: string) {
        if (null !== refMenssage.current) {
            const refer = refMenssage.current as any;
            refer.OpenMessage(title, message, type, redirect);
        }
    }

    function renderModal(){
       if(load){
        return( <Modal ref={refModal}/>);
       }
    }

    return (
        <>
          <GlobalContext.Provider
            value={{
              OpenAlert,
              OpenConfirm,
              OpenMessage,
              OpenMsg,
              OpenModal,
              OpenToast
            }}>
              {children}
              <Alert ref={refAlert}/>
              <Confirm ref={refConfirm}/>
              <Message ref={refMenssage}/>
               {renderModal()}
              <Toast ref={refToast}/>
          </GlobalContext.Provider>
        </>
      );
    };   
export default GlobalContainer;