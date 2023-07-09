import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] =[
    {title:"Dashboard", url:'#', icon:'fa fa-dashboard',active:true,
    level2:[]},
    {title:"Usuarios", url:'usuarios',icon:'fa fa-users',open:'menu-is-opening menu-open', active:true,
    level2:[{title:"Crear", url:'usuarios',icon:'fa fa-users',active:true,
    level3:[]}]},
    {title:"Mascotas", url:'mascotas', icon:'fa fa-paw',active:true,
    level2:[]},
    ]
}
