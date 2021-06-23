import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Injectable } from '@angular/core';
import Usuario from '../../model/usuario';

@Injectable()
export class AuthService {

  private authenticated: boolean = false;

  constructor(private router: Router) { }

  login(usuario : Usuario ){
    let emitir = false;
    if (usuario.login === 'grise' &&  usuario.password === '1234') {
      this.authenticated = true;
      this.router.navigate(['/']);
    } 
  }

  getAuthenticated(){
    return this.authenticated;
  }

}