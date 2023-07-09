import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent {

  private fb = inject(FormBuilder)

  public form:FormGroup = this.fb.group(
    {
      username :['']
    }
  )
    /**
     * login
     */
    login(){
      
    }
  
}
