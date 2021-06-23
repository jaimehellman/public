import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreModule } from '../../core/core.module';
import { GrupoRoutingModule } from './grupo-routing.module.';

import  EtapaService   from '../../services/etapa.service';
import  GrupoEtapaService  from '../../services/grupo-etapa.service';

import { GrupoEtapaComponent } from './grupo-etapa.component';
import { EtapaComponent } from './etapa/etapa.component';
import MockService from '../../services/core/mock.service';

@NgModule({
  declarations: [
    EtapaComponent,
    GrupoEtapaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    GrupoRoutingModule
  ],
  providers:[
      EtapaService,
      GrupoEtapaService,
      MockService
  ],

})
export class GrupoEtapaModule { }
