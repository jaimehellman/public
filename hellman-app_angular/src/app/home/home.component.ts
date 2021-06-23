import { Component, OnInit } from '@angular/core';
import ToastService from  '../core/toast/toasr.service';
import { ModalExampleComponent } from '../test/modal-example/modal-example.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toastService : ToastService) { }

  ngOnInit() {
  }
  
  abrirModal(){
     this.toastService.showToastWarning("SUCESSO","Está é uma confirmação!","agora");
  }
 }
