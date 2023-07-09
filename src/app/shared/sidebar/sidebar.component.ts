import { Component, computed, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems?:any[];
 
  
  public authService = inject(AuthService);
  public sidebarService = inject(SidebarService);
  
  public user = this.authService.currentUser();
  public currentUser:User|null = this.user;
  public open:string = 'menu-is-opening menu-open';
  public userName = this.currentUser?.first_name+" "+this.currentUser?.last_name_1;
  
  constructor(){
    this.menuItems = this.sidebarService.menu;
   
  }
}