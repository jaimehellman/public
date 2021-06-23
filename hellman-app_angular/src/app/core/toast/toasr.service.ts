import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastComponent } from './toast.component';

export enum ToastTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = "info",
  WARNING = "warning"
}

@Injectable()
export default class ToastService {

  constructor(private modalService: BsModalService) {}
  
  showToast(title: string, message: string, time: string, type: ToastTypes) {
     const bsModalRef: BsModalRef = this.modalService.show(ToastComponent);
     this.modalService.removeBackdrop();
     bsModalRef.content.title = title;
     bsModalRef.content.message = message;
     bsModalRef.content.time = time?time: new Date().toLocaleDateString();
     bsModalRef.content.type = type;
     bsModalRef.content.icon = this.getIcon(type);
     bsModalRef.setClass("toast-modal");
  }

  showToastError(title: string, message: string, time: string) {
      this.showToast(title, message, time, ToastTypes.DANGER);
  }

  showToastInfo(title: string, message: string, time: string) {
      this.showToast(title, message, time, ToastTypes.INFO);
  }

  showToastSuccess(title: string, message: string, time: string) {
      this.showToast(title, message, time, ToastTypes.SUCCESS);
  }

  showToastWarning(title: string,message: string, time: string) {
      this.showToast(title, message, time, ToastTypes.WARNING);
  }

  getIcon(type : ToastTypes){
     let icon : string = "";
     switch(type)
     {
        case ToastTypes.DANGER:
           icon = "exclamation-circle";
        break;
        case ToastTypes.INFO:
           icon = "info-circle";
        break;
        case ToastTypes.SUCCESS:
          icon = "check-circle";
        break;
        case ToastTypes.WARNING:
          icon = "exclamation-triangle";
        break;
     }
     
     return icon;
  }

}
