import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiResponse } from '../interfaces/general';
import { TokenService } from './token.service';
import { RegistroCobrador } from '../interfaces/cobradores';

@Injectable({
  providedIn: 'root'
})
export class CobradoresService {

  constructor(
    private http:HttpClient,
    private tokenService:TokenService 
  ) {}

  get()
  {
    return this.http.get<apiResponse>(`${environment.baseUrl}empresas/${this.tokenService.returnEmpresa()}/cobradores`, { headers: this.tokenService.returnHeader() });
  }

  registrar(datos:RegistroCobrador)
  {
    return this.http.post<apiResponse>(`${environment.baseUrl}cobradores/registrar`, datos,{ headers: this.tokenService.returnHeader() });
  }

  obtenerInformacionCobrador(id:number)
  {
    return this.http.get<apiResponse>(`${environment.baseUrl}cobradores/obtenerInformacionCobrador/${id}`,{ headers: this.tokenService.returnHeader() });
  }


  retornarCobradoresParaSelect(id:number)
  {
    return this.http.get<apiResponse>(`${environment.baseUrl}cobradores/retornarCobradoresParaSelect/${id}`,{ headers: this.tokenService.returnHeader() });
  }


}
