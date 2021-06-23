import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { GrupoEtapaComponent } from './grupo-etapa.component';

const routes: Routes = [
  { path: 'grupo-etapa', component: GrupoEtapaComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class GrupoRoutingModule {}