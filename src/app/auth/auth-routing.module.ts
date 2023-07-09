import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './guards';
import { NopageFoundComponent } from '../nopage-found/nopage-found.component';
import { PagesComponent } from '../pages/pages.component';

const routes:Routes = [
  {
    path: '',canActivate:[isNotAuthenticatedGuard], component: LoginComponent,
    children: [
      { path: '', component: PagesComponent },
      { path: '**', redirectTo: 'login' },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
