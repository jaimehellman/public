import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  
  {
    path: 'grupo-etapa', 
    loadChildren: './components/grupo-etapa/grupo-etapa.module#GrupoEtapaModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
   
  },
  {
    path: 'home', 
    component : HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
