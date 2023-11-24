import { Component, computed, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Menu, User } from 'src/app/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
 
  
  public authService = inject(AuthService);
  public sidebarService = inject(SidebarService);
  
  public user = this.authService.currentUser();
  public currentUser:User|null = this.user;
  public userName = this.currentUser?.full_name+" "+this.currentUser?.last_name_1;
  
  private menuItems:Menu[]|undefined =this.user?.menu;
  constructor(){
    
  }  
  
  get menuItem()
  {
    return this.menuItems;
  }
}