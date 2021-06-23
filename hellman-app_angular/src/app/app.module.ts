import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AuthService } from './services/core/auto.service';
import { AuthGuard } from './shared/guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { HomeModule } from './home/home.module';
import { GrupoEtapaModule } from './components/grupo-etapa/grupo-etapa.module';
import { InterceptorModule } from './shared/interceptor/interceptor.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalExampleComponent } from './test/modal-example/modal-example.component';
import ModalService from './core/modal/modal.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalExampleComponent,
  ],
  imports: [
    BrowserModule,
    InterceptorModule,
    HttpClientModule,
    FormsModule,
    HomeModule,
    ModalModule.forRoot(),
    GrupoEtapaModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService, 
    AuthGuard,
    ModalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
