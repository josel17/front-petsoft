import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const url         = state.url;
  const authService = inject(AuthService);
  const router      = inject(Router);
  localStorage.setItem('url',url);
  
  console.log(AuthStatus.authenticated);
  if(authService.authStatus() === AuthStatus.authenticated) 
  {
    return true;
  }
  
  if(authService.authStatus() === AuthStatus.checking)
  {
    return false;
  }
  
  
  router.navigateByUrl('login');
  return false;
};


export const isAuthenticatedChildGuard: CanActivateChildFn = (route, state) => {
  
 
  return false;
};