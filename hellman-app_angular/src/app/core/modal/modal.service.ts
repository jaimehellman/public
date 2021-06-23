import { Injectable } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable()
export default class ModalService {

    constructor(private modalService: BsModalService) {}
    showModal(title: string, data: any, component: any) {
        const bsModalRef: BsModalRef = this.modalService.show(component);
        this.modalService.removeBackdrop();
        bsModalRef.content.title = title;
        bsModalRef.content.data = data;
    }
  }