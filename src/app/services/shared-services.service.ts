import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private showSpinner:boolean = this.getShowSpinner();

  getShowSpinner():boolean
  {
    return this.showSpinner;
  }
  
  setShowSpinner(status:boolean=true):void
  {
    setTimeout(() =>
    {
      this.showSpinner = status;
    }, 3000)
  }
}
