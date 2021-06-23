import { Component, OnInit, Input } from '@angular/core';
import {  BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.css']
})
export class ModalExampleComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }
 
   
  @Input() title: string;
  @Input() data: string;

  ngOnInit(): void {
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
