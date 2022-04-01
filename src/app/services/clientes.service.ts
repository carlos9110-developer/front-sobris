import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiResponse } from '../interfaces/general';
import { TokenService } from './token.service';
import { EditarInformacionCliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private http:HttpClient,
    private tokenService:TokenService 
 ) { }



  obtenerClientesPorCobrador(cobrador:number){
    return this.http.get<apiResponse>(`${environment.baseUrl}clientes/obtenerClientesPorCobrador/${cobrador}`,{ headers: this.tokenService.returnHeader() });
  }

  obtenerInfoCliente(id:number){
    return this.http.get<apiResponse>(`${environment.baseUrl}clientes/obtenerInfoCliente/${id}`,{ headers: this.tokenService.returnHeader() });
  }

  editarInfoCliente(datos:EditarInformacionCliente){
    return this.http.put<apiResponse>(`${environment.baseUrl}clientes/editarInformacion`,datos,{ headers: this.tokenService.returnHeader() });
  }

  

}
