import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {  BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() time: string;
  @Input() type: string;
  @Input() icon: string;
  timeout: number = 4;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    let anThis: any = this;
    setTimeout(function(){ 
        anThis.onClose();
    }, 
    this.timeout*1000);
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
