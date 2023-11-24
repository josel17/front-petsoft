import { inject, Injectable, computed, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, map, catchError, of, throwError } from 'rxjs';
import { Response, AuthStatus,Request, ResponseService} from '../interfaces';
import { CryptographyService } from './cryptography.service';
import { Router } from '@angular/router';
import { DataLogin,User,DataStatus, Menu } from '../interfaces';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl:string = environment.urlBase;
  private http = inject( HttpClient);
  private cryptoService = inject(CryptographyService);


  private _currentUser = signal<User|null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  private _request = signal<Request|null>(null);

  
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());
  public Request = computed(() => this._request());

  constructor() {
    this.checkAuthStatus().subscribe();
   }
  
  login(bodyData:string): Observable<boolean>{
    const url = `${this.baseUrl}/auth/login`;
    const body = ({bodyData});
 
    return this.http.post<string>(url,body)
    .pipe(
      map((res) => {
        const response:Response<DataLogin> =JSON.parse( this.cryptoService.decrypt(res));
        this._currentUser.set(response.data.user)
        this._authStatus.set(AuthStatus.authenticated);
       localStorage.setItem('token',response.data.token)
       return true
      }),
      tap((res) => {true}
      ),
      //todo errores
      catchError(err => throwError(() => {
        const response:Response<DataLogin> =JSON.parse( this.cryptoService.decrypt(err.error));
        console.log(err);
        return(response);
      } ))
      )}

  checkAuthStatus():Observable<boolean>
  {
    const url =`${this.baseUrl}/auth/verifyToken`;
    const token = localStorage.getItem('token');
    if(!token)
    {
      this.logout();
      return of(false);
    }else{
      const headers = new  HttpHeaders()
      .set('Authorization',`Bearer ${token}`);

      return this.http.get<string>(url, {headers}).
      pipe(
        tap(() => true),
        
        map((jsonResponse) =>    
        {

          const responseToken:Response<DataStatus> =JSON.parse(this.cryptoService.decrypt(jsonResponse));
          this._authStatus.set(AuthStatus.authenticated);
          this._currentUser.set(responseToken.data.user);
          localStorage.setItem('company', JSON.stringify(responseToken.data.company));
          localStorage.setItem('user',JSON.stringify(responseToken.data.user));
        
          return true;
        }),
        catchError((error) =>{
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false)
          }
          )
      ) 
    }
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('url');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
