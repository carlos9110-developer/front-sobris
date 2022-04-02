import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { datosSesion } from '../interfaces/users';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router:Router
  ) { }

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
    let user:string             = localStorage.getItem("user") || "";
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

  public validarToken() : string
  {
    let user:string             = localStorage.getItem("user") || "";
    return user;
  }



}
