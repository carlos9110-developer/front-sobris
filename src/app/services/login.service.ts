import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiResponse, dateLogin } from '../interfaces/general';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(datos:dateLogin) : Observable<apiResponse>
  {
    return this.http.post<apiResponse>(`${environment.baseUrl}login`,datos);
  }

}
