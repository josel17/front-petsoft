import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { PetComponent } from './pet/pet.component';
import { PagesComponent } from './pages.component';
import { isAuthenticatedChildGuard, isAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';
import { NopageFoundComponent } from '../nopage-found/nopage-found.component';


const routes:Routes=[
  {path:'dashboard',canActivate:[isAuthenticatedGuard],component:PagesComponent,
  children:[
    {path:'', canActivate:[isAuthenticatedGuard],component:DashboardComponent, data:{title:'Dashboard'}},
    {path:'usuarios', canActivate:[isAuthenticatedGuard], component:UserComponent, data:{title:'Usuarios'}},
    {path:'mascotas',canActivate:[isAuthenticatedGuard],component:PetComponent, data:{title:'Mascotas'}},
    {path:'**', canActivate:[isAuthenticatedGuard],component:DashboardComponent,data:{title:'Not found'}},
    
  ]}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
