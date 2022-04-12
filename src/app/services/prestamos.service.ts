import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiResponse } from '../interfaces/general';
import { ICambiarCobradorPrestamo, PrestamoCliente, PrestamoClienteRegistrado } from '../interfaces/prestamo';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {



  constructor(
    private http:HttpClient,
    private tokenService:TokenService 
  ) {}

  registrar(datos:PrestamoCliente)
  {
    return this.http.post<apiResponse>(`${environment.baseUrl}prestamos`, datos,{ headers: this.tokenService.returnHeader() });
  }

  registroPrestamoCliente(datos:PrestamoClienteRegistrado)
  {
    return this.http.post<apiResponse>(`${environment.baseUrl}prestamos/registroPrestamoCliente`, datos,{ headers: this.tokenService.returnHeader() });
  }

  obtenerPrestamosPorCobrador(id:number)
  {
    return this.http.get<apiResponse>(`${environment.baseUrl}prestamos/obtenerPrestamosPorCobrador/${id}`,{ headers: this.tokenService.returnHeader() });
  }
 
  obtenerPrestamosCliente(id:number)
  {
    return this.http.get<apiResponse>(`${environment.baseUrl}prestamos/obtenerPrestamosCliente/${id}`,{ headers: this.tokenService.returnHeader() });
  }

  obtenerPrestamosCartera(id:number)
  {
    return this.http.get<apiResponse>(`${environment.baseUrl}prestamos/obtenerPrestamosCartera/${id}`,{ headers: this.tokenService.returnHeader() });
  }

  cambiarCobradorPrestamo(datos:ICambiarCobradorPrestamo){
    return this.http.patch<apiResponse>(`${environment.baseUrl}prestamos/cambiarCobradorPrestamo`,datos,{ headers: this.tokenService.returnHeader() });
  }



}
