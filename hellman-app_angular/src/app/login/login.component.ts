import { Component, OnInit } from '@angular/core';
import Usuario from '../model/usuario';
import { AuthService } from '../services/core/auto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.usuario);
  }
}
