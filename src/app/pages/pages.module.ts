import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PetComponent } from './pet/pet.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { UtilModule } from '../util/util.module';
import { SpinnerComponent } from '../util/spinner/spinner.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    PetComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    DataTablesModule,
    UtilModule
  ],
  exports:[
    DashboardComponent,
    UserComponent,
    PetComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
