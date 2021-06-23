import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from './confirm.component';



@Injectable()
export default class ConfirmService {

  constructor(private modalService: BsModalService) {}
  
  showConfirm(title: string, message: string, okText?: string, cancelText?: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmComponent);
    this.modalService.removeBackdrop();
    bsModalRef.content.title = title;
    bsModalRef.content.message = message;

    if (okText) {
      bsModalRef.content.okText = okText;
    }

    if (cancelText) {
      bsModalRef.content.cancelText = cancelText;
    }

    return (<ConfirmComponent>bsModalRef.content).confirmResult;
  }

}
