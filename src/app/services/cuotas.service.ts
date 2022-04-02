import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IInfoCuota, IObtenerRutaCobradorPorFecha, IAbonoCuota, IPagoCuota, IObtenerCuotasPrestamoPorFecha, IObtenerRutaGeneralEmpresaPorFecha } from '../interfaces/cuotas';
import { apiResponse } from '../interfaces/general';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CuotasService {

  constructor(
     private http:HttpClient,
     private tokenService:TokenService 
  ) { }

  obtenerRutaCobradorPorFecha(datos:IObtenerRutaCobradorPorFecha)
  {
    return this.http.post<apiResponse>(`${environment.baseUrl}cuotas/getRutaByFechaAndCobrador`,datos,{ headers: this.tokenService.returnHeader() });
  }

  obtenerRutaGeneralEmpresaPorFecha(datos:IObtenerRutaGeneralEmpresaPorFecha)
  {
    return this.http.post<apiResponse>(`${environment.baseUrl}cuotas/obtenerRutaGeneralEmpresaPorFecha`,datos,{ headers: this.tokenService.returnHeader() });
  }

  abonoCuota(datos:IAbonoCuota)
  {
    return this.http.post<apiResponse>(`${environment.baseUrl}cuotas/abono`,datos,{ headers: this.tokenService.returnHeader() });
  }

  pagoCuota(datos:IPagoCuota)
  {
    return this.http.post<apiResponse>(`${environment.baseUrl}cuotas/pago`,datos,{ headers: this.tokenService.returnHeader() });
  }

  info(id:number)
  {
    return this.http.get<apiResponse>(`${environment.baseUrl}cuotas/info/${id}`,{ headers: this.tokenService.returnHeader() });
  }

  incumplido(id:number)
  {
    let datos = {
      id: id
    }
    return this.http.patch<apiResponse>(`${environment.baseUrl}cuotas/incumplido`,datos,{ headers: this.tokenService.returnHeader() });
  }
  

  obtenerCuotasPorPrestamo(idPrestamo:number){
    return this.http.get<apiResponse>(`${environment.baseUrl}cuotas/obtenerCuotasPrestamo/${idPrestamo}`,{ headers: this.tokenService.returnHeader() });
  }
  
  obtenerCuotasPrestamoPorFecha(datos:IObtenerCuotasPrestamoPorFecha){
    return this.http.post<apiResponse>(`${environment.baseUrl}cuotas/obtenerCuotasPrestamoPorFecha`,datos,{ headers: this.tokenService.returnHeader() });
  }



}
