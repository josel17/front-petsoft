import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { PagesComponent } from './pages/pages.component';

const routes:Routes = [
  {
    path: '',
    canActivate: [ isNotAuthenticatedGuard ],
    component:LoginComponent,
    children: [
      {path:'login', component:LoginComponent, title:"Login"},
      {path:'**', redirectTo:'login'}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
