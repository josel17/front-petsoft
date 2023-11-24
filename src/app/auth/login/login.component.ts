import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { CryptographyService } from '../../services/cryptography.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  private fb                  = inject(FormBuilder)
  private authService         = inject(AuthService);
  private CryptographyService = inject(CryptographyService);
  private router              = inject( Router);


  public loginForm: FormGroup = this.fb.group({
    username :['',[Validators.required]],
    password :['', [Validators.required]],
    remember :[false]
  })

  public title: string = "Ingresar";



  login()
  {
    const {username, password} = this.loginForm.value;
   
   
   const data:string =  this.CryptographyService.encrypt(JSON.stringify({username,password}))
    
   
    this.authService.login(data)
    .subscribe({
      next: ((res) =>{
        const url:string|null = localStorage.getItem('url') === null || localStorage.getItem('url') === '/' || localStorage.getItem('url') === '' ? '/dashboard': localStorage.getItem('url') ;
        this.router.navigateByUrl(`${url}`)
      }), 
      error: (error) => {
        if(error.status)
        {
          Swal.fire(error.message,error.errorMessage,'error');
        }else{
          Swal.fire("Error en el servicio","Ocurrio un error en el servicio",'error');
        }
      }
    })

  }
    
}
