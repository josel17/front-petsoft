import { inject, Injectable, computed, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, map, catchError, of, throwError } from 'rxjs';
import { Response, AuthStatus,Request, ResponseService} from '../interfaces';
import { CryptographyService } from './cryptography.service';
import { Router } from '@angular/router';
import { Selectors, DataUser } from '../interfaces';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl:string = environment.urlBase;
  private http = inject( HttpClient);
  private cryptoService = inject(CryptographyService);
  
  private _dataSelectors = signal<Selectors|null>(null);
  private _allUser = signal<DataUser[]|null>(null);

  public dataSelectors = computed(() => this._dataSelectors());
  public allUser = computed(() => this._allUser());
  public isLoading = true;
  constructor() {
    
   }
  
  dataStart(): Observable<boolean | Selectors>{
    const url = `${this.baseUrl}/user/dataStart`;
    
    return this.http.get<string>(url)
    .pipe(
      map((res) => {
        const response:Response<Selectors> =JSON.parse( this.cryptoService.decrypt(res));

        this._dataSelectors.set(response.data);
       return response.data;

      }),
      tap((res) => {true}
      ),
      //todo errores
      catchError(err => throwError(() => {
       
        console.log(err);
        return(false);
      } ))
      )}

  getAllUsers():Observable<null | DataUser[]>
  {
   
    const url = `${this.baseUrl}/user/getall`;
    return this.http.get<string>(url)
    .pipe(
      map((res) => {
        const response:Response<DataUser[]> = JSON.parse(this.cryptoService.decrypt(res));
        this._allUser.set(response.data);
        return response.data;
        
      }),
      catchError(error => throwError(()=> {
        //console.log(error);
        const errorRsp = JSON.parse(this.cryptoService.decrypt(error.error));
        return errorRsp;
        
      }))
    )
  }
  
  saveUser(bodyData:string):Observable<Response<null>>
  {
    const url = `${this.baseUrl}/user/register`;
    const body = ({bodyData});
    return this.http.post<string>(url,body)
    .pipe(
      map((res) => 
      {
        const response:Response<null> = JSON.parse(this.cryptoService.decrypt(res));
        return response;
      }),
      tap((res) => 
      {
        console.log(res);
        true
      }
      ),
      catchError(error => throwError(() =>
      {
        const respone:Response<null> =JSON.parse( this.cryptoService.decrypt(error.error));
        return respone;
      }))
    )
  }

  diableUser(bodyData:string):Observable<Response<null>>
  {
    const url = `${this.baseUrl}/user/disable`;
    const body = ({bodyData});

    return this.http.post<string>(url, body)
    .pipe(
      map((res) =>
      {
        const response: Response<null> = JSON.parse(this.cryptoService.decrypt(res));
        return response;
      }),
      tap((res) =>
      {
        return true;
      }),
      catchError(error => throwError(() =>
      {
        const response:Response<null> = JSON.parse(this.cryptoService.decrypt(error.error));
        return response;
      }))
    )
  }
}
