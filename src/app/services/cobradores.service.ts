import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiResponse } from '../interfaces/general';
import { TokenService } from './token.service';

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


}
