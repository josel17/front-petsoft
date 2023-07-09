import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  title:string ="Usuarios";


  private fb = inject(FormBuilder)
  
  public userForm:FormGroup = this.fb.group(
    {
      documentTypeId: [0],
      documentNumber: [""],
      firstName: [""],
      secondName:[""],
      lastName1: [""],
      lastName2: [""],
      genderId:[0],
      email: [""],
      companyId: [0],
      status: [0],
    })
    //constructor (private fb:FormBuilder){}
    public save()
    {
      
    }
}
