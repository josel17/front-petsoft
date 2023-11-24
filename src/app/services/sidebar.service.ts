import { Injectable } from '@angular/core';
import { Menu } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:Menu[] =[
    {title:"Dashboard",label:"Dashboard", url:'#', icon:'fa fa-dashboard'},
    {title:"Usuarios", label:"Usuarios", url:'usuarios',icon:'fa fa-users'},
    {title:"Mascotas", label:"Mascotas", url:'mascotas', icon:'fa fa-paw'},
    ]
}
