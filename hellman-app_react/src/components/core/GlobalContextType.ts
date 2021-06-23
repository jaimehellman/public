import { createContext, ReactNode } from "react";
import { MessageType } from "./message/MessageType";

interface GlobalContextType {
    OpenAlert: Function;
    OpenConfirm: Function;
    OpenMessage: Function;
    OpenModal: Function;
    OpenMsg: Function;
    OpenToast: Function;
}

const context = createContext<GlobalContextType>({
    OpenAlert: (type: MessageType, message: string, redirect: string) => {},
    OpenConfirm: (title: string, message: string, okText: string, cancelText: string) => {},
    OpenMessage: (type: MessageType, message: string, redirect: string) => {},
    OpenModal: (childrens: ReactNode, data: any) => {},
    OpenMsg: (type: MessageType, title: string, message: string, redirect: string) => {},
    OpenToast: (title: string, type: MessageType, message: string, redirect: string, icon: string) => {},
});

export default context;