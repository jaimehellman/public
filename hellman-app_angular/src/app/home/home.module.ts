import { NgModule, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CoreModule} from '../core/core.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home.component';


import ToastService from '../core/toast/toasr.service';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent, 
    FooterComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  exports : [
    HomeComponent,
    HeaderComponent, 
    FooterComponent,
    MenuComponent
  ],
  providers:[
    ToastService,
  ]
})
export class HomeModule { }
