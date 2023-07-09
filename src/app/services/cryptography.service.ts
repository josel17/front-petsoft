import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../environments/environments';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class CryptographyService {

  private readonly _key = CryptoJS.enc.Utf8.parse("96ff9382c8a7bc6caafbe66289265179");
  private readonly _iv = CryptoJS.enc.Utf8.parse("96ff9382c8a7bc6c");

  public encrypt(text: string): string{
    var encrypt = CryptoJS.AES.encrypt(text, this._key, {
        iv: this._iv,
        mode: CryptoJS.mode.CBC
    });
    return encrypt.toString();
  }
  

  public decrypt(text: string): string{
    var dataDecrypt = CryptoJS.AES.decrypt(text, this._key, {
      iv: this._iv,
      mode: CryptoJS.mode.CBC
  });
  var dataDecode: string = dataDecrypt.toString(CryptoJS.enc.Utf8);
  return dataDecode;
  }
}
