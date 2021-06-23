import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from './alert.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = "info",
  WARNING = "warning"
}

@Injectable()
export default class AlertService {

  constructor(private modalService: BsModalService) {}

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
      const bsModalRef: BsModalRef = this.modalService.show(AlertComponent);
      this.modalService.removeBackdrop();
      bsModalRef.content.type = type;
      bsModalRef.content.message = message;
      if (dismissTimeout) {
        setTimeout(() => bsModalRef.hide(), dismissTimeout);
      }
  }

  showError(message: string) {
    this.showAlert(message, AlertTypes.DANGER,3000);
  }

  showInfo(message: string) {
    this.showAlert(message, AlertTypes.INFO, 3000);
  }

  showSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showWarning(message: string) {
    this.showAlert(message, AlertTypes.WARNING, 3000);
  }

}
