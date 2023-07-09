import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  //const url = state.url;
  //localStorage.setItem('url',url);
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.authStatus() === AuthStatus.authenticated) 
  {
    return false;
  }

  return true;
  
};
