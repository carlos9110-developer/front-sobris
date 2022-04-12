import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { datosSesion } from '../interfaces/users';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public key = CryptoJS.enc.Utf8.parse ("1234123412ABCDEF"); // número hexadecimal de 16 dígitos como clave
  public iv = CryptoJS.enc.Utf8.parse ('ABCDEF1234123412'); // Número hexadecimal como desplazamiento de clave
   
  constructor(
    private router:Router
  ) { 
        console.log()
   }


  returnHeader():HttpHeaders
  {
    let headers = new HttpHeaders({"Authorization": this.returnToken() });
    return headers;
  }

  private returnToken() : string
  {
    return  this.returnDatosSesion().token;
  }

  private returnDatosSesion() : datosSesion
  {
    let user:any             = localStorage.getItem("user") || "";
    user = this.decryp(user);
    let datosSesion:datosSesion = JSON.parse(user);
    return datosSesion;
  }

  returnEmpresa()
  {
    return this.returnDatosSesion().empresa_id;
  }

  returnId()
  {
    return this.returnDatosSesion().id;
  }

  returnRol()
  {
    return this.returnDatosSesion().rol_id;
  }

  
  redirigirLogin(){
    this.limpiarLocalStorage();
    this.router.navigate(['login']);
  }

  limpiarLocalStorage(){
    localStorage.clear();
  }

   validarToken() : string
  {
    let user:string             = localStorage.getItem("user") || "";
    return user;
  }

  guardanSesionLocalStorage(data:datosSesion)
  {
    localStorage.setItem('user',this.encrypt(data));
  }

   encrypt(data:datosSesion) {
    let srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    let encrypted = CryptoJS.AES.encrypt(srcs, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  }

   decryp(data:string){
    let encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }




}
