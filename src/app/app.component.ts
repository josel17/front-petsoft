import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthStatus } from './interfaces';
import { Router } from '@angular/router';
import { SharedService } from './services/shared-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  public  title: string  = 'PetSoft';
  
  private router = inject(Router);
  private authService = inject( AuthService);
  private sharedServices = inject(SharedService);
  public showSpinner:boolean =false;

  ngOnInit(): void {
    
   }
   constructor()
   {
     this.showSpinner = this.sharedServices.getShowSpinner();

  }
  
  public finishedAuthCheck = computed<boolean>(() => 
  {
    console.log(this.authService.authStatus());
    if(this.authService.authStatus() === AuthStatus.checking)
    {
      return true;
    }
    return true;
  });


  public authStatusChangeEfect = effect(() => 
  {
    console.log("AuhtStatus: ", this.authService.authStatus());
    
    switch(this.authService.authStatus())
    {
      case 'checking':
        break;

      case 'authenticated':
        const url:string|null = localStorage.getItem('url');
       console.log(url);
        this.router.navigateByUrl(`${url}`);
        break;
      
      case 'notAuthenticated':
        this.router.navigateByUrl('login');
        break;
    }
  });

  

}
